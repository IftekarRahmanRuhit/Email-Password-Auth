// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWOwSUtSwySSSLx-oPay4rzk0S7ixoNYM",
  authDomain: "email-password-auth-c0e95.firebaseapp.com",
  projectId: "email-password-auth-c0e95",
  storageBucket: "email-password-auth-c0e95.firebasestorage.app",
  messagingSenderId: "856074687323",
  appId: "1:856074687323:web:961f31af3818b6f0b6c07e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

