import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDTljcNd8ujC-2q2ip5uBXbNrXtpWVfdnI",
  authDomain: "delivery-app-a317d.firebaseapp.com",
  projectId: "delivery-app-a317d",
  storageBucket: "delivery-app-a317d.appspot.com",
  messagingSenderId: "1098827057230",
  appId: "1:1098827057230:web:8f280a960a1656e223db1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default auth;
