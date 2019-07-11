import { SEND_MESSAGE, ADD_USER, REMOVE_USER, EDIT_TEXT, FORWARD_TEXT, GET_REPLIES, USER_PROFILE, FETCH_POST } from '../Actions/actionTypes'
import { combineReducers } from 'redux'
import casual from 'casual-browserify'
import Rebase from 're-base';
import app from '../base';
import firebase from 'firebase';
import { DropButton } from 'grommet';



var INIT_STATE = ["first state"]
var iD= 0
var uID = 0
var fuID = -1
var rID = 0
var checker = 0

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: false
});


const Send = (state=INIT_STATE, action) => {
  console.log(state)
    switch(action.type){
      case SEND_MESSAGE:
      var date = new Date
      var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var sentence = casual.sentence
  
      return [...state, {
          id:action.id,
          text: action.text,
          time: time,
          uID: uID++
        } 
      ]

      case FETCH_POST:
       return [...state, {
         recieved: true,
         sender: action.sender,
         text: action.message,
         time: action.time,
         id: action.id,
         image: action.image,
         uID: action.sender
       }]; 


      case REMOVE_USER:
      return( state.filter(text=>  text.id !==action.id))

      case EDIT_TEXT:
      return state.map((i) => {
        if(i.uID== action.uID) {
        return {...i,
        text:action.newtext} }

        return i
      })
       
      case FORWARD_TEXT:
      return [...state, {
        id: action.id,
        text: state.map((i)=> {
          if(i.uID==action.uID) {
            return i.text
          }
        }),
        time: time,
        uID: fuID--
      }]

      default:
      return (state)

    }
    
}




const Add = (state= [], action) => {
    switch(action.type){
      case ADD_USER:
      var date = new Date
      var month= date.getMonth() + 1
        var time = date.getDate() + "-" + month + "-" + date.getFullYear();
      return state = [...state, {name: action.name, id: iD++, date: time}]

      case USER_PROFILE:
      return [...state, {nickname: action.nickname}]

      case REMOVE_USER:
      var newArr
      return (window.confirm("are you sure you want to delete user?") ?
      (newArr = state.filter( user => user.id !== action.id)): state)


      case FORWARD_TEXT:
      (alert("message forwarded to " + state.map(a=>action.id==a.id? a.name: null)))

      case FETCH_POST:
      let count = state.length
      for (var i=0; i<=count; i++) {
           var dan= checker++

              
      }
    if (dan ==0) {
      state = [...state, {name: action.sender, id: action.sender, date: time}]
    }

      default:
    return (state)


    }
}


export default combineReducers ({
     Send,
     Add,
     
})
