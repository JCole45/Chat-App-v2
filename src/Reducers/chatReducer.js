import { SEND_MESSAGE, ADD_USER, REMOVE_USER, EDIT_TEXT, FORWARD_TEXT, USER_PROFILE, FETCH_POST, FETCH_REPLY } from '../Actions/actionTypes'
import { combineReducers } from 'redux'
import casual from 'casual-browserify'
import Rebase from 're-base';
import app from '../base';
import firebase from 'firebase';
import { DropButton } from 'grommet';

function getUnique(arr, comp) {

  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}


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
  
      return [...state, {
          id:action.id,
          text: action.text,
          time: time,
          uID: uID++,
          image: action.image,
          recieved: false,
          identifier: action.randNo
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
         uID: action.sender,
         identifier: action.identifier
       }]; 

       case FETCH_REPLY:
       return [...state, {
         recieved: false,
       }
       ]


      case REMOVE_USER:
      return( state.filter(text=>  text.id !==action.id))


      case EDIT_TEXT:
      return state.map((i) => {
        if(i.identifier == action.identifier) {
        return {...i,
        text:action.newtext + " edited"} }

        return i
      } )

       
      case FORWARD_TEXT:
      return [...state, {
        id: action.fid,
        text: action.text,
        time: time,
        uID: action.fid,
        recieved: false,
        identifier: action.randNo + 'f',
        image: ''
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
      let user = action.name
      let count = state.length
      for (var i=0; i<=count; i++) {
           var dan= checker++
            state = [...state, {name: action.sender, id: action.sender, date: time}]

           return getUnique(state,'name')  
      } 
    if (dan ==0) {
    }

      default:
    return (state)


    }
}


export default combineReducers ({
     Send,
     Add,
     
})
