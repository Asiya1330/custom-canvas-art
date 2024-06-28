import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// TODO: Add keys to env

const firebaseConfig = {
  apiKey: "AIzaSyCdLG16UvKTTQ1V6W7ZtxJdFJsMkKEjdJw",
  authDomain: "custom-canvas-27b6a.firebaseapp.com",
  projectId: "custom-canvas-27b6a",
  storageBucket: "custom-canvas-27b6a.appspot.com",
  messagingSenderId: "874199151836",
  appId: "1:874199151836:web:80067e838dec43f4d73019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };