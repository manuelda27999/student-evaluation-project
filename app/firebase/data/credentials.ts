// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg7UBhPBigo7tgH4GG3MmINgaXt4nglFs",
  authDomain: "student-evaluation-ce395.firebaseapp.com",
  projectId: "student-evaluation-ce395",
  storageBucket: "student-evaluation-ce395.firebasestorage.app",
  messagingSenderId: "415554007480",
  appId: "1:415554007480:web:b6226c0f8650625d91df4d",
  measurementId: "G-ZZQ50663SG",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export { auth, db };
