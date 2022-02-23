import firebase from "firebase/compat";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBuoa4WiCbM-qjH3CYGFG-SE7zX9skfQOQ",
  authDomain: "graphql-firebase-95872.firebaseapp.com",
  databaseURL: "https://graphql-firebase-95872.firebaseio.com",
  projectId: "graphql-firebase-95872",
  storageBucket: "graphql-firebase-95872.appspot.com",
  messagingSenderId: "167847388669",
  appId: "1:167847388669:web:09857371bf1e0d2fa8a594",
});

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { db, auth, storage, firestore };
