// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-88a7e.firebaseapp.com",
  projectId: "real-estate-mern-88a7e",
  storageBucket: "real-estate-mern-88a7e.appspot.com",
  messagingSenderId: "451427946826",
  appId: "1:451427946826:web:482c4b9416a73b7639b1b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);