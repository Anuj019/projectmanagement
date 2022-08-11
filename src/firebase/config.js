import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZ-tDdxVg4Vro-g5S9LldUSzNsL9vWC4g",
    authDomain: "thedojosite-a9209.firebaseapp.com",
    projectId: "thedojosite-a9209",
    storageBucket: "thedojosite-a9209.appspot.com",
    messagingSenderId: "668581148167",
    appId: "1:668581148167:web:0abeaad84c2e2653071ca2"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
 
  // init services 

  const projectFirestore = firebase.firestore()
  const projectAuth =firebase.auth()
  const projectStorage = firebase.storage()

// time stamp 

const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp, projectStorage}