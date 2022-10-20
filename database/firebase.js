import firebase from "firebase";
import "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtIemNlizlTuNxT2dUc9-OZUPRhTvaUaI",
  authDomain: "cascadasaguaazul.firebaseapp.com",
  projectId: "cascadasaguaazul",
  storageBucket: "cascadasaguaazul.appspot.com",
  messagingSenderId: "326823088100",
  appId: "1:326823088100:web:269b25ce52466c602441f1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
