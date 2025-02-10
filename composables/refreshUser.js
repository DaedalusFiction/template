import { doc, getDoc } from "firebase/firestore";
import { db } from "~/firebase.config";

export default async function useRefreshUser() {
  const firebaseID = useState("firebaseID");
  const firebaseUser = useState("firebaseUser", () => null);
  const isLoading = ref(false);
  try {
    isLoading.value = true;
    const user = await getDoc(doc(db, "users", firebaseID.value));
    firebaseUser.value = user.data();
    isLoading.value = false;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
