// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "learningfirebase-a3c89.firebaseapp.com",
  projectId: "learningfirebase-a3c89",
  storageBucket: "learningfirebase-a3c89.appspot.com",
  messagingSenderId: "461366802998",
  appId:process.env.REACT_APP_ID,
  measurementId: "G-69Q3D9QK82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);