import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKrWm6AWBbFzCiG_Z3Yic0uZSmD0w23dg",
  authDomain: "react-firebase-crud-de718.firebaseapp.com",
  projectId: "react-firebase-crud-de718",
  storageBucket: "react-firebase-crud-de718.appspot.com",
  messagingSenderId: "710784419944",
  appId: "1:710784419944:web:845bee3740ef4a4d6c93dd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
