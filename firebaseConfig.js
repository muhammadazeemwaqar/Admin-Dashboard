import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD9aUzXP2NoQ3EmW6yhFNyaQ0CDtIgzzdI",
    authDomain: "rheeproject.firebaseapp.com",
    projectId: "rheeproject",
    storageBucket: "rheeproject.appspot.com",
    messagingSenderId: "334392750199",
    appId: "1:334392750199:web:440b0eb0c500d66b84d672",
    measurementId: "G-91HXPT1LDR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);