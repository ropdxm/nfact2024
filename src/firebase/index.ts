// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiH6xzXbNMWP1CrZ0LGq1u6HqVvwrlVVA",
  authDomain: "spoty-e4cf9.firebaseapp.com",
  projectId: "spoty-e4cf9",
  storageBucket: "spoty-e4cf9.appspot.com",
  messagingSenderId: "321035484206",
  appId: "1:321035484206:web:b3c19630d15f53027d33bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const commentsCol = collection(db, "comments");
export const ratingCol = collection(db, "rating");
export type CommentData = {
	/** When reading from firebase, id isn't automatically populated, we have to get it from document's id */
	user: string;
	message: string;
	date: Timestamp;
};