// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.F_apiKey,
  authDomain: import.meta.env.F_authDomain,
  projectId: import.meta.env.F_projectId,
  storageBucket: import.meta.env.F_storageBucket,
  messagingSenderId: import.meta.env.F_messagingSenderId,
  appId: import.meta.env.F_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);