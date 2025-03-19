// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUD71QNdj1eSt-elHLS_NXNtIoTOgn97A",
  authDomain: "portfolio-website-db.firebaseapp.com",
  projectId: "portfolio-website-db",
  storageBucket: "portfolio-website-db.firebasestorage.app",
  messagingSenderId: "243971231959",
  appId: "1:243971231959:web:a0e5110d3353a756fde092",
  measurementId: "G-RVTE4D6LX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };