import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnDH4tMTozjkbiBORbaI9MODJzCA8Q9zY",
  authDomain: "metroidvaniadatabase.firebaseapp.com",
  projectId: "metroidvaniadatabase",
  storageBucket: "metroidvaniadatabase.appspot.com",
  messagingSenderId: "718247512374",
  appId: "1:718247512374:web:878155cd155198d8464b97",
  measurementId: "G-E4YC14RF1L",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { db, storage, provider, auth };
