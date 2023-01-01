import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC9pfcyBm62AxDKZPlfxw09dE7HbXDZGU4",
  authDomain: "help-desk-d269b.firebaseapp.com",
  projectId: "help-desk-d269b",
  storageBucket: "help-desk-d269b.appspot.com",
  messagingSenderId: "504803547281",
  appId: "1:504803547281:web:cf28c44dd1641142b2c730"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default auth;
