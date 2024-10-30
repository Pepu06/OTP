// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// PEDROGONZALEZSORO@GMAIL.COM
// const firebaseConfig = {
//   apiKey: "AIzaSyAk69sBBj_W2zd0Pkwg2nDbZSVFrIGc-VY",
//   authDomain: "otp-cc97b.firebaseapp.com",
//   projectId: "otp-cc97b",
//   storageBucket: "otp-cc97b.appspot.com",
//   messagingSenderId: "1068331355078",
//   appId: "1:1068331355078:web:5b97046a4f8fda040500c7",
//   measurementId: "G-9VRFHYX673",
// };

// ALQUILERESDGS@GMAIL.COM
// const firebaseConfig = {
//   apiKey: "AIzaSyDtRehC-Pjs-40d3wSn1UysUwDs-VIAts8",
//   authDomain: "otp-pruebas-99497.firebaseapp.com",
//   projectId: "otp-pruebas-99497",
//   storageBucket: "otp-pruebas-99497.appspot.com",
//   messagingSenderId: "636831196825",
//   appId: "1:636831196825:web:de9e308fe74f38b5ad7a08",
//   measurementId: "G-KKFBP5Z2YZ",
// };

// 47572859
const firebaseConfig = {
  apiKey: "AIzaSyA_ZPeqgGwa2nLlDmmMPA_rKq10XMsulRE",
  authDomain: "otp-vacio.firebaseapp.com",
  projectId: "otp-vacio",
  storageBucket: "otp-vacio.appspot.com",
  messagingSenderId: "354056438744",
  appId: "1:354056438744:web:0dd72b0d56371b784b28ad",
  measurementId: "G-FZ56CVKJQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
