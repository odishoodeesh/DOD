import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDbSwYpRZ5Qvp7JaOjPIWxFAJJnB4X286g",
  authDomain: "dod-ai.firebaseapp.com",
  projectId: "dod-ai",
  storageBucket: "dod-ai.firebasestorage.app",
  messagingSenderId: "89340614057",
  appId: "1:89340614057:web:c3dbcc9ea58dd3931f60b8",
  measurementId: "G-MQT43JL9PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
