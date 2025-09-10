import { db, storage } from "~/firebase.config";
import useSnackbar from "../showSnackbar";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { ref as firebaseRef } from "firebase/storage";

export default async function useGetDocuments(collectionName, total) {
  const getDocuments = () => {};
  await getDocuments();
}
