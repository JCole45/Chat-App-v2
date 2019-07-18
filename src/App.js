import React, {Component} from 'react'
import ChatField from './Container/chatField';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/Auth';
import Login  from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import PrivateRoute from './Authentication/PrivateRoute'
import Details from './Authentication/Details'
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase';
import {app, sign } from './base';



class App extends Component {


  render()
{
  const {
    user,
    signOut,
    signInWithGoogle,
  } = this.props;
  console.log({user})

    return(
      <AuthProvider>
      <Router>
      <div className="App">

      {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
         
          {user ? 
          <p>Welcome {user.displayName}<img src= {user.photoURL} height="40" width="40"/></p> : <p>Sign in with Google</p>}


      <PrivateRoute exact path ="/" component ={ChatField} />
      <Route exact path ="/login" component = {Login }  />
      <Route exact path ="/signup" component = {SignUp} />
      </div>
      
      </Router>
      </AuthProvider>
    );
  }
}

const firebaseAppAuth = sign;

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
