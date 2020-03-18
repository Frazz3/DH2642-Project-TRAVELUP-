import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const fbConfig = {
    apiKey: "AIzaSyBDf0iV4dj6XPracATb2Or9oN6i1lma9hk",
    authDomain: "travelup-2fcd0.firebaseapp.com",
    databaseURL: "https://travelup-2fcd0.firebaseio.com",
    projectId: "travelup-2fcd0",
    storageBucket: "travelup-2fcd0.appspot.com",
    messagingSenderId: "678217901276",
    appId: "1:678217901276:web:586c6cb1ccf06dc9cc0019"
  };

// Initialize Firebase
firebase.initializeApp(fbConfig);
firebase.firestore(); //.settings({ timestampsInSnapshots: true})   //changes how firebase work on time stamps, vet ej om det behövs? tror inte

export default firebase;