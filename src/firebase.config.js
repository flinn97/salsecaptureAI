import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC1ejMnWWe98bFa29RwIiBBB7UndNdJ1cA",
  authDomain: "salescaptureai.firebaseapp.com",
  projectId: "salescaptureai",
  storageBucket: "salescaptureai.firebasestorage.app",
  messagingSenderId: "392166418592",
  appId: "1:392166418592:web:7807d9aafec37b8c0581c5",
  measurementId: "G-BTPP6403LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};
