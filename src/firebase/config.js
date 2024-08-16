// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk69sBBj_W2zd0Pkwg2nDbZSVFrIGc-VY",
  authDomain: "otp-cc97b.firebaseapp.com",
  projectId: "otp-cc97b",
  storageBucket: "otp-cc97b.appspot.com",
  messagingSenderId: "1068331355078",
  appId: "1:1068331355078:web:5b97046a4f8fda040500c7",
  measurementId: "G-9VRFHYX673",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
