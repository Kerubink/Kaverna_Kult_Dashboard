// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZXAZ7OIXvn8SryLC4dHdOXXWBGaud2d8",
  authDomain: "kavernakult.firebaseapp.com",
  projectId: "kavernakult",
  storageBucket: "kavernakult.firebasestorage.app",
  messagingSenderId: "706887446189",
  appId: "1:706887446189:web:a66b3d39ab9c21eb6fe024",
  measurementId: "G-LJ18XMWCNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);



export {db, analytics, auth, getDocs, getDoc, doc, collection, updateDoc}