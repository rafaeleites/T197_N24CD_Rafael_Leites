// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlyVjYy1tj2onvT5dYIFj387oxaftt9FM",
  authDomain: "t197-projetoadm.firebaseapp.com",
  projectId: "t197-projetoadm",
  storageBucket: "t197-projetoadm.firebasestorage.app",
  messagingSenderId: "696653419461",
  appId: "1:696653419461:web:fae9691f54fe1b636171ac",
  measurementId: "G-DNWEQW154S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);