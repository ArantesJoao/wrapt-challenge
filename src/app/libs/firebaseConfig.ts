import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

// Just to make everything clear, just like I did on schema.prisma file: normally, I would obviously set this up using a .env file, but since I have to get this up and running, I would have to send these data to you guys anyways, so it's just easier to add it here
const firebaseConfig = {
  apiKey: "AIzaSyDbDusDCBu-l78RmkzA3dl2GVdEg2t5Ny0",
  authDomain: "wrapt-challenge.firebaseapp.com",
  projectId: "wrapt-challenge",
  storageBucket: "wrapt-challenge.appspot.com",
  messagingSenderId: "963003186645",
  appId: "1:963003186645:web:7ef1ef46a17aca90c4915c",
  measurementId: "G-05WPQK3NH6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage()
