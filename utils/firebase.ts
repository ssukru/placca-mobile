import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZdrWBhADuLkGPFSAWBSVcH0H3T0YI170",
  authDomain: "plaka-app.firebaseapp.com",
  projectId: "plaka-app",
  storageBucket: "plaka-app.appspot.com",
  messagingSenderId: "732513590071",
  appId: "1:732513590071:web:b2f3632d6bb9ab77a3d8b2",
  measurementId: "G-XJTH7BHJ0Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore;
