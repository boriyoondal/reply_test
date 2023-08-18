// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfogZN0pMfhlXccIZGEfB-wro0cwjZa0c",
  authDomain: "test-fe7e4.firebaseapp.com",
  projectId: "test-fe7e4",
  storageBucket: "test-fe7e4.appspot.com",
  messagingSenderId: "322451572229",
  appId: "1:322451572229:web:2de03d97f71b7fecdebe6c",
  measurementId: "G-LR6G6ZGNM8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const db = getFirestore(firebaseApp);
