// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB12Et-vDDlEj1E1QV2y7JL1NRiLosp_78",
  authDomain: "share-1add2.firebaseapp.com",
  projectId: "share-1add2",
  storageBucket: "share-1add2.appspot.com",
  messagingSenderId: "676686039880",
  appId: "1:676686039880:web:8657eb4e6e7161fae9017d",
  measurementId: "G-V3W8K7PJRR"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};

