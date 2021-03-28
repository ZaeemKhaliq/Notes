import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCaH4wNMhyblPTEkfHENINkRT9gHfJNJOk",
    authDomain: "notes-12cb9.firebaseapp.com",
    projectId: "notes-12cb9",
    storageBucket: "notes-12cb9.appspot.com",
    messagingSenderId: "770811033343",
    appId: "1:770811033343:web:294f60e0a23490e0afbeca",
    measurementId: "G-GYFW293E16"
});
  

const db = firebaseApp.firestore();
export {db};