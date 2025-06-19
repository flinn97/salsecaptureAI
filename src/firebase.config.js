import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAoReJ73uMcZ6FahopnVZmfeMKld4jiIgY",
  authDomain: "viridian-3afda.firebaseapp.com",
  projectId: "viridian-3afda",
  storageBucket: "viridian-3afda.firebasestorage.app",
  messagingSenderId: "156480615416",
  appId: "1:156480615416:web:acda86fcfa52a332e51c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};
