<template>
  <h2 class="page-header">
    Advertise with Metroidvania<span class="text-secondary">DB</span>
  </h2>
  <div class="details">
    <div class="col-span-6">
      <h3 class="page-subheader">Why Us?</h3>
    </div>
    <div class="col-span-6">
      <p>
        {{ siteName }} is the premier platform for discovering AAA and indie
        metroidvanias. Users can search by title or keyword, filter by
        properties like platform and primary perspective, gameplay mechanics,
        and an extensive array of tags to find their next fix.
      </p>
      <br />
      <p>
        If you're releasing your debut title, working on generating pre-launch
        interest, or gearing up for the next big patch or update,
        {{ siteName }} is the place to reach the exact userbase that will be
        curious to see what you can offer.
      </p>
      <br />
      <p>
        We offer native and banner ad space that catches attention and drives
        clicks.
      </p>
      <br />
      <p>
        Reach out to us at
        <a href="mailto:advertise@boomershooterdb.com" class="underline"
          >advertise@boomershooterdb.com</a
        >
        to learn about our packages.
      </p>
    </div>
  </div>
</template>

<script setup>
import { propertyOptions, siteName, tagOptions } from "~/data";
</script>

<style scoped></style>
