import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyBUqlLYjmq3ccsRxeKt1LWTd4XgcjbUHYk",

  authDomain: "bomrp-2dd1f.firebaseapp.com",

  databaseURL: "https://bomrp-2dd1f-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "bomrp-2dd1f",

  storageBucket: "bomrp-2dd1f.appspot.com",

  messagingSenderId: "374990180653",

  appId: "1:374990180653:web:a040405ff90945ad3d83a4"

};


  //init firebase

 firebase.initializeApp(firebaseConfig)
 
  //init services

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()
  
  //timestamp

  const timestamp = firebase.firestore.Timestamp


  export {projectFirestore, projectAuth, projectStorage, timestamp}