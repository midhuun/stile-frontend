//@ts-nocheck
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBhMQLRaODDWJaCeCjOk22xVtSoWG6nLtg",
  authDomain: "stile-sagio.firebaseapp.com",
  projectId: "stile-sagio",
  storageBucket: "stile-sagio.firebasestorage.app",
  messagingSenderId: "509506437334",
  appId: "1:509506437334:web:744f0cdb932cc31cfec977",
  measurementId: "G-REHJZZZCZG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);