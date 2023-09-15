import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "wrapt-challenge.firebaseapp.com",
  projectId: "wrapt-challenge",
  storageBucket: "wrapt-challenge.appspot.com",
  messagingSenderId: "963003186645",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-05WPQK3NH6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage()
