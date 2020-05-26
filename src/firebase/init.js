import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAPK0D3JFk3iuTO21QHzR56sO7syC0XEIs",
  authDomain: "vuejs-firebase-01-89ba1.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-01-89ba1.firebaseio.com",
  projectId: "vuejs-firebase-01-89ba1",
  storageBucket: "vuejs-firebase-01-89ba1.appspot.com",
  messagingSenderId: "996131291254",
  appId: "1:996131291254:web:1138e2465fb975a87e1f57",
  measurementId: "G-GL3SFMJZVH"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});

export default firebaseApp.firestore();
