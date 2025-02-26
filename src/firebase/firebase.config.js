// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3V1lXyzfIxczS1XOy1WyDMN6xkNq_UAM",
  authDomain: "e-cash-54ac4.firebaseapp.com",
  projectId: "e-cash-54ac4",
  storageBucket: "e-cash-54ac4.firebasestorage.app",
  messagingSenderId: "160631496873",
  appId: "1:160631496873:web:352d93d8799e36640709b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;