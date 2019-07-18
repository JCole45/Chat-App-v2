import { SEND_MESSAGE, RECEIVE_MESSAGE, ADD_USER, REMOVE_USER, EDIT_TEXT, FORWARD_TEXT } from './actionTypes'


export const sendMessage = (text, id) => ({
  type: SEND_MESSAGE,
  text,
  id
})

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
