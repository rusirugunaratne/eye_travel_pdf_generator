import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGNplqdKp6RAI2aw7fxSSV6SiJQDvoPdw",
    authDomain: "eyetravel-37f14.firebaseapp.com",
    databaseURL: "https://eyetravel-37f14-default-rtdb.firebaseio.com",
    projectId: "eyetravel-37f14",
    storageBucket: "eyetravel-37f14.appspot.com",
    messagingSenderId: "231645422231",
    appId: "1:231645422231:web:86c46bf323ac7863d4ffd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);