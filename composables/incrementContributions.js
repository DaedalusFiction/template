import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "~/firebase.config";

export default async function useIncrementContributions(modification) {
  const firebaseID = useState("firebaseID");
  try {
    await updateDoc(doc(db, "users", firebaseID.value), {
      contributions: increment(1),
      lastModified: Date.now(),
      lastModification: modification,
      modifications: arrayUnion(modification),
    });
    return true;
  } catch {
    return false;
  }
}
