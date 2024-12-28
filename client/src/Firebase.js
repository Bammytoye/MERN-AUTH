// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-app-76a37.firebaseapp.com",
    projectId: "mern-auth-app-76a37",
    storageBucket: "mern-auth-app-76a37.firebasestorage.app",
    messagingSenderId: "856576989043",
    appId: "1:856576989043:web:c5374df1f2fa1801605706"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);