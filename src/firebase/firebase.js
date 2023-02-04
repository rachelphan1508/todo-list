// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqbtO4ihNqI5V6dnwMo_wOQzIQv-gupNI",
  authDomain: "todo-list-da771.firebaseapp.com",
  databaseURL: "https://todo-list-da771-default-rtdb.firebaseio.com",
  projectId: "todo-list-da771",
  storageBucket: "todo-list-da771.appspot.com",
  messagingSenderId: "885752673975",
  appId: "1:885752673975:web:cb53367d0550cd52e17f32",
  measurementId: "G-9WHN8260GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const auth = getAuth()
