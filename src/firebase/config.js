// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXOIgcLAyd-TNV_-PykDm0Aj1WUqUuNsQ",
  authDomain: "react-demo-journal-app.firebaseapp.com",
  projectId: "react-demo-journal-app",
  storageBucket: "react-demo-journal-app.appspot.com",
  messagingSenderId: "707834070129",
  appId: "1:707834070129:web:e60f5fb167bf5ee7bfc7d0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );