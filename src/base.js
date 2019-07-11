import Rebase from 're-base';
import firebase from 'firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBwunqIZoTwogOPntE0nDw0TfALTQ6FDPA",
  authDomain: "chat-app-v20.firebaseapp.com",
  databaseURL: "https://chat-app-v20.firebaseio.com",
  projectId: "chat-app-v20",
  storageBucket: "chat-app-v20.appspot.com",
  messagingSenderId: "680095158193",
  appId: "1:680095158193:web:7c5607bf088188f1"

})

const sign= app.auth()

export { app , sign }