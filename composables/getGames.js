import { collection, getDocs, limit } from "firebase/firestore";
import { db } from "~/firebase.config";

export default async function useGetGames(folder, hits, startAfter) {
  const gamesRef = collection(db, folder);
  const results = await getDocs(gamesRef, limit(2));
  return { results };
}
