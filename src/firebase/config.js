// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};


// Your web app's Firebase configuration
// DEV
// const firebaseConfig = {
//   apiKey: "AIzaSyAXOIgcLAyd-TNV_-PykDm0Aj1WUqUuNsQ",
//   authDomain: "react-demo-journal-app.firebaseapp.com",
//   projectId: "react-demo-journal-app",
//   storageBucket: "react-demo-journal-app.appspot.com",
//   messagingSenderId: "707834070129",
//   appId: "1:707834070129:web:e60f5fb167bf5ee7bfc7d0"
// };

// TESTING
// const firebaseConfig = {
//   apiKey: "AIzaSyC1acxSQ0JeWh0WMIJwJKWUSu1vHyBKS4M",
//   authDomain: "react-demo-journal-testing.firebaseapp.com",
//   projectId: "react-demo-journal-testing",
//   storageBucket: "react-demo-journal-testing.appspot.com",
//   messagingSenderId: "350407784067",
//   appId: "1:350407784067:web:022eadbbe9a3cdf7ad4db6"
// };


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);