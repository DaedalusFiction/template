<template>
  <div>
    <LayoutPageHeader header="Events" />

    <div class="md:grid grid-cols-12 px-auto mx-3 my-12 gap-12">
      <h2 class="mb-3 col-span-3">Upcoming</h2>
      <div class="col-span-9">
        <LayoutEvent
          v-for="(event, index) in upcomingEvents"
          :key="index"
          :event="event"
        />
      </div>
      <h2 class="mb-3 col-span-3">Past</h2>
      <div class="col-span-9">
        <LayoutEvent
          v-for="(event, index) in pastEvents"
          :key="index"
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase.config";
const events = ref([]);
const upcomingEvents = ref([]);
const pastEvents = ref([]);

onMounted(async () => {
  const eventsRef = collection(db, "events");
  const snapshot = await getDocs(eventsRef);
  events.value = snapshot.docs;
  const result = sortEvents(snapshot.docs);
  upcomingEvents.value = result.upcomingEvents;
  pastEvents.value = result.pastEvents;
});

function sortEvents(events) {
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Initialize result objects
  const result = {
    upcomingEvents: [],
    pastEvents: [],
  };

  // Helper function to convert date string to comparable date object
  const getDateObject = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // Sort events into appropriate arrays
  events.forEach((event) => {
    const eventDate = getDateObject(event.data().date);

    if (eventDate.getTime() === today.getTime()) {
      // Today's events go to upcoming
      result.upcomingEvents.push({ ...event.data(), isToday: true });
    } else if (eventDate > today) {
      // Future events
      result.upcomingEvents.push({ ...event.data(), isToday: false });
    } else {
      // Past events
      result.pastEvents.push(event.data());
    }
  });

  // Sort upcoming events: today's events first, then by date
  result.upcomingEvents.sort((a, b) => {
    if (a.isToday && !b.isToday) return -1;
    if (!a.isToday && b.isToday) return 1;
    return new Date(a.date) - new Date(b.date);
  });

  // Sort past events by date (most recent first)
  result.pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Clean up temporary isToday property
  result.upcomingEvents = result.upcomingEvents.map(
    ({ isToday, ...event }) => event
  );

  return result;
}
</script>

<style lang="scss" scoped></style>
