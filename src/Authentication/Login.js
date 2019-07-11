import React , { useCallback, useContext } from  'react'
import { withRouter, Redirect } from 'react-router'
import {app} from '../base'
import {AuthContext} from './Auth'
import { async } from 'q';
import { auth } from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import SignUp from './SignUp'


const Login = ({ history }) => {
    const handleLogin = useCallback (
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements; 
            try {
                await app 
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                history.push("/")
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser) {
        return <Redirect to="/" />;

    }

    var signUpPage = () => {
        history.push("/signup")
    }
 
    return (
        <div>

           <h2>Log In</h2>
           <form onSubmit={handleLogin}>
           <label>
               Email
               <input name="email" type="email" placeholder="Email"/>
           </label>
           
           <label>
               Password
               <input name="password" type="password" placeholder="Password" />
           </label>

           <button type="submit"> Log In </button>
           </form>
    <button onClick = {() => signUpPage()} > Sign Up </button>
        </div>
    );

};

export default withRouter(Login);