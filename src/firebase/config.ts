// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVN4eooMQz1NfgbcQmFWzFZv0fWAHhJHM",
  authDomain: "college-organizer-68adc.firebaseapp.com",
  projectId: "college-organizer-68adc",
  storageBucket: "college-organizer-68adc.appspot.com",
  messagingSenderId: "803311954633",
  appId: "1:803311954633:web:40fa0daf1220b3d49f7b18",
  measurementId: "G-MFGC98ETKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);