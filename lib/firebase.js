// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ4xMnJbHaPr7JOAxd6DmZr9j3gulbA8c",
  authDomain: "gvfoods-469c0.firebaseapp.com",
  projectId: "gvfoods-469c0",
  storageBucket: "gvfoods-469c0.firebasestorage.app",
  messagingSenderId: "357064703700",
  appId: "1:357064703700:web:a22eb5be0d39ac96dc8541",
  measurementId: "G-C3RJ0FLWWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);