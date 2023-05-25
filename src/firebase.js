import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "star-rail-messenger.firebaseapp.com",
  projectId: "star-rail-messenger",
  storageBucket: "star-rail-messenger.appspot.com",
  messagingSenderId: "246285981117",
  appId: "1:246285981117:web:9d3abe8dffd3a405c72ed4",
  measurementId: "G-YW8L7526L9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();