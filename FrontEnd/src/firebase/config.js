import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrRxKa3h283ONk6neWpgvEy7RURXCDp6U",
  authDomain: "envirolens.firebaseapp.com",
  projectId: "envirolens",
  storageBucket: "envirolens.firebasestorage.app",
  messagingSenderId: "543503124091",
  appId: "1:543503124091:web:8200f1bbf0eaf3e1f4c4de",
  measurementId: "G-W0LW9632WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;