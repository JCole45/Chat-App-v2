import firebase from 'firebase';
import { SEND_MESSAGE, FETCH_POST, ADD_USER, REMOVE_USER, EDIT_TEXT, FORWARD_TEXT, FETCH_REPLY, GET_REPLIES, USER_PROFILE } from './actionTypes'
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
          time: change.doc.data().timestamp.toDate().getHours()+":"+change.doc.data().timestamp.toDate().getMinutes() +" " + change.doc.data().timestamp.toDate().getDate(),
          identifier : change.doc.data().identifier
        })
      }
      })
   })
  } 
}

export function fetchReply (nickname) {
  return dispatch => {
    userCollection.where('sender', '==', nickname).get().then(snapshot => {
      snapshot.forEach(doc => {
        dispatch({
          type: FETCH_REPLY,
          message: doc.data().message,
          image: doc.data().image,
          id: doc.data().id,
          time: doc.data().timestamp.getTime()
        })
      })
    })
  }
}

export function sendMessage (text, image, nickname,  id, randNo) {
  return dispatch => {
    const userRef = db.collection('Users').add({
      message: text,
      id: nickname,
      timestamp: new Date,
      image: image,
      sender: nickname,
      recipient: id,
      identifier: randNo
        }
        );
        dispatch({
          type: SEND_MESSAGE,
          text,
          id,
          image,
          randNo    
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

export function editText (identifier, newtext) { 
  return dispatch => {
    userCollection.where('identifier', '==', identifier ).get().then(snapshot => {
       snapshot.forEach(dan=> {
      console.log(dan.id) 
      db.collection('Users').doc(dan.id).update({message: newtext}) 
    })
    })
  dispatch({
  type: EDIT_TEXT,
  identifier,
  newtext
}) 
} }

export function forwardText (fid, user, text, randNo, tid) {
return dispatch => {
  db.collection('Users').add({
    message: text,
    id: user,
    timestamp: new Date,
    sender: user,
    recipient: fid,
    identifier: randNo + 'f'
      }
      );
dispatch({
  type: FORWARD_TEXT,
  text,
  user,
  tid,
  fid,
  randNo
})
}}

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
