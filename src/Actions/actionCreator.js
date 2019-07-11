import firebase from 'firebase';
import { SEND_MESSAGE, FETCH_POST, ADD_USER, REMOVE_USER, EDIT_TEXT, FORWARD_TEXT, GET_REPLIES, USER_PROFILE } from './actionTypes'
import { O_NOFOLLOW } from 'constants';


const now = new Date
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

let userCollection = db.collection('Users');


export function fetchPost (nickname) {
  return dispatch => {
    userCollection.orderBy('recipient').onSnapshot(snapshot => {
     let changes = snapshot.docChanges();
     changes.forEach(change =>
      {if (change.doc.data().recipient == nickname) {
        dispatch({
          type: FETCH_POST,
          message: change.doc.data().message,
          sender: change.doc.data().sender,
          image: change.doc.data().image,
          id: change.doc.data().id,
          time: now.getTime
        })
      }
      })
   })
  } 
}

export function sendMessage (text, image, nickname,  id) {
  return dispatch => {
    const userRef = db.collection('Users').add({
      message: text,
      id: nickname,
      timestamp: new Date,
      image: image,
      sender: nickname,
      recipient: id
        }
        );
        dispatch({
          type: SEND_MESSAGE,
          text,
          id,
          image
        })
  } 
}

export const addUser = name => ({
  type: ADD_USER,
  name
})

export const removeUser = id => ({
  type: REMOVE_USER,
  id
})

export const editText = (uID, newtext) => ({
  type: EDIT_TEXT,
  uID,
  newtext
})

export const forwardText = (id, uID) => ({
  type: FORWARD_TEXT,
  id,
  uID
})

export const getReplies = (sender, message, time, ) => ({
  type: GET_REPLIES,
  sender,
  message,
  time
})

export const userProfile = (nickname) => ({
   type: USER_PROFILE,
   nickname
   
})


//    userCollection.where('recipient', '==', nickname).get().then( snapshot => {
  //snapshot.forEach(doc=>
  //  dispatch({
  //    type: FETCH_POST,
 //     message: doc.data().message,
 //     sender: doc.data().sender,
  //    image: doc.data().image,
   //   id: doc.data().id,
  //    time: now.getTime
  //  })
//)

//}) 
