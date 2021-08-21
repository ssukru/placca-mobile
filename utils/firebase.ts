import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth;
export const firestore = firebase.firestore;
