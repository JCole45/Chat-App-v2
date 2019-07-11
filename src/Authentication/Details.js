import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router'
import {AuthContext} from './Auth'
import ChatField from '../Container/chatField'

class Details extends Component {
    
    
     

    render() {
    return (
        
        <div>
                       <h2>Profile</h2>
           <form onSubmit={"plah"}>
           <label>
               Username
               <input name="username" type="username" placeholder="Username"/>
           </label>
           
           </form>

           <button type="submit"> + </button>


        </div>
    )
}
}

export default Details