import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "testing-drag-drop.firebaseapp.com",
  projectId: "testing-drag-drop",
  storageBucket: "testing-drag-drop.appspot.com",
  messagingSenderId: "884885381630",
  appId: "1:884885381630:web:263bef7bc0c1c11f5f60af"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db };
