
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYWtNIPh3v0Kor--JafBT8o2yQZjy5OYk",
  authDomain: "weugly-94422.firebaseapp.com",
  projectId: "weugly-94422",
  storageBucket: "weugly-94422.appspot.com",
  messagingSenderId: "720708575449",
  appId: "1:720708575449:web:e8c73f204988097b2c5ec8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);