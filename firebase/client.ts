import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0fkdlim_3A_nvWzGwsXhnu8m-FrmpIVE",
  authDomain: "ai-mock-interview-e2e24.firebaseapp.com",
  projectId: "ai-mock-interview-e2e24",
  storageBucket: "ai-mock-interview-e2e24.firebasestorage.app",
  messagingSenderId: "903476643798",
  appId: "1:903476643798:web:95817b966174045d134677",
  measurementId: "G-GBP2RKC57P",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
