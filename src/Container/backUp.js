import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { sendMessage, addUser, selectUser1, selectUser2 } from '../Actions/actionCreator'
import {connect} from 'react-redux'
import '../App.css';
import { Box, Grommet, Distribution, Clock, TextInput } from 'grommet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Icons from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


class ChatField extends Component {
  constructor (props) {
    super(props)
    this.state = {
        message: '',
        username: '',
        id: ''
    }
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onAddUser= this.onAddUser.bind(this)
    this.onAddId = this.onAddId.bind(this)
    this.onEnter = this.onEnter.bind(this)
  }

  onSendMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  onAddUser(d){
    this.setState({
      username: d.target.value
    })
  }

  onAddId(e){
    this.setState({
      id: e
    })
  }

  onEnter (f) {
    if(f.key==='Enter'){this.props.sendMessage(this.state.message);
    this.setState({message:''}) }
  }



  render ()
  {  console.log(this.props)
     var visual;

    return (
      <React.Fragment>
      <CssBaseline/>
  <div>


           <section className="First User">
           { (this.props.text.map( (t)=> (t.id==this.state.id? (<div> <span>

              {t.text}{t.time}

            </span> </div>) : null)))}

             <TextInput onChange={this.onSendMessage}
               value={this.state.message}
               placeholder="send message"
               onKeyPress={this.onEnter.bind(this)}/>




 <button onClick={()=> { this.setState({message:''})}}> cancel </button>

 <button onClick={() => {this.props.sendMessage(this.state.message, this.state.id);
 this.setState({message:''}) }}> send </button>


      </section>


      <div className="Second User">
           <input onChange={this.onAddUser}
           value={this.state.username}
           placeholder="user name"
           size="small"/>
<Toolbar>
           <button color="primary" variant="outlined" onClick={()=> {this.props.addUser(this.state.username);
           this.setState({username:''}) }}> add user </button>
</Toolbar>

  <Box align="center" background="neutral-2" size="small">
    <button
      label="hello world"
      primary
      onClick={() => alert('hello, world')}
    > test </button>
  </Box>

<Distribution
  values={[
    { value: 100, color: 'light-3' },
    { value: 50, color: 'light-3' },
  ]}
>
  {value => (
    <Box pad="small" background={value.color} fill>
      <p> mary's lamb </p>
    </Box>
  )}
</Distribution>
<Clock type="digital" precision="seconds" />
<Button
  label="Edit"
  onClick={() => {alert("useless button")}}
/>


<Box
  direction="row"
  border={{ color: 'brand', size: 'large' }}
  pad="large"
>
  <Box pad="medium" background="dark-3">
  <div className="userList">
    {this.props.users.map( (u) =>
      (<div><span onClick={()=> {this.onAddId(u.id)}} >
          {u.name}
         </span></div> ))}
       </div>
</Box>

  <Box pad="large" background="light-3" animation="slideDown">
  <section className="First User">
  { (this.props.text.map( (t)=> (t.id==this.state.id? (<div> <span>

     {t.text}{t.time}

   </span> </div>) : null)))}

    <TextInput onChange={this.onSendMessage}
      value={this.state.message}
      placeholder="send message"
      onKeyPress={this.onEnter.bind(this)}/>




<button onClick={()=> { this.setState({message:''})}}> cancel </button>

<button onClick={() => {this.props.sendMessage(this.state.message, this.state.id);
this.setState({message:''}) }}> send </button>


</section>
</Box>
</Box>


     </div>


      <div className="user change">
      </div>


  </div>


    </React.Fragment>);
  }
}


const mapStateToProps = (state) => {
  return {
    text: state.Send,
    users: state.Add
  };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      sendMessage, addUser
    },dispatch)
}



export default connect( mapStateToProps, mapDispatchToProps )(ChatField);
