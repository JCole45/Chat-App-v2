import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { sendMessage, addUser, removeUser, editText, forwardText } from '../Actions/actionCreator'
import {connect} from 'react-redux'
import '../App.css';
import { Box, Grommet, Clock, TextInput, Text, Select, DropButton } from 'grommet';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


class ChatField extends Component {
  constructor (props) {
    super(props)
    this.state = {
        message: '',
        username: '',
        id: 0,
        fid:1,
        uID: 'e',
        edit: '',
        value: 'medium',
        s: 'forward'
    }
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onAddUser= this.onAddUser.bind(this)
    this.onAddId = this.onAddId.bind(this)
    this.onEnterSend = this.onEnterSend.bind(this)
    this.onRemoveUser = this.onRemoveUser.bind(this)
    this.onAlertTest = this.onAlertTest.bind(this)
    this.onDisplay =  this.onDisplay.bind(this)

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

  onEnterSend (f) {
    if(f.key==='Enter'){this.props.sendMessage(this.state.message, this.state.id);
    this.setState({message:''}) }
  }

  onEnterAdd(e) {
    if(e.key==='Enter'){this.props.addUser(this.state.username);
    this.setState({username:''}) }
  }

  onRemoveUser(e) {
    this.setState({
      id: e
    })
   }

   onDisplay(){
     return(
     <div>
     <li>
     {this.props.users.map((u)=> u.name)}
     </li>
     </div>)
   }

  onAlertTest(e) {
    e == 'remove' ? this.props.removeUser(this.state.id) :
    alert("created on " + this.props.users.map(u=> u.date));
  }

  onEditText(e) {
    e=='edit' ?
    this.props.editText(this.state.uID , prompt("edit text below"))
    : this.props.forwardText(this.state.id, this.state.uID, this.setState({id: this.state.uID}));

  }


  render ()
  {  console.log(this.props)
     var visual;

    return (
      <React.Fragment>
      <CssBaseline/>
  <div>




      <div className="Second User">
           <input onChange={this.onAddUser}
           value={this.state.username}
           placeholder="user name"
           size="small"
           onKeyPress={ this.onEnterAdd.bind(this)}/>




           <button color="primary" variant="outlined" onClick={()=>
             {this.props.addUser(this.state.username);
           this.setState({username:''}) }}> add user </button>



<Box
  direction="row"
  border={{ color: 'brand', size: 'large' }}
  pad="large" round="true" width="xlarge" height="medium"
>
   <Box background="dark-1" >
   <div>
   {this.props.users.map((u)=> this.state.id==u.id ? u.name : null)}
   </div>
   </Box>

  <Box className="user box" pad="medium" background="dark-3" width="small" overflow="scroll">
  <Text color="Pink"> Users: </Text>
  <div className="userList">

    {this.props.users.map( (u) =>
      (<div><span onClick={()=> {this.onAddId(u.id)}}>
          {this.state.id==u.id? <span class="dot"></span> : null}{u.name}

          <Select
            options={['info','remove']}
            value={"Options"}
            onChange={({ option }) => this.onAlertTest(option)}/>

         </span></div> ))}
       </div>
</Box>

  <Box pad="large" background="light-3" animation={3>4? "slideDown" : null} width="large" overflow="scroll">
  <section className="First User">

  {this.props.users.map((u)=> (u.id==this.state.id? <Text color="red">{u.name}</Text> : null))}

  {(this.props.text.map( (t)=> (t.id==this.state.id?
    (
  <div>
    <span  onClick={()=> this.setState({uID:t.uID})}>

          {t.text} <Text color="grey" size="xsmall">{t.time}</Text> <Select options={['edit']}
           value={"edit"} onChange={({option}) => this.onEditText(option)} alignSelf="end" size="small" />

     <DropButton
       label="Forward"
       dropAlign={{ top: 'bottom', right: 'right' }}
       size="small"
       dropContent={

         <Box pad="large" background="light-2">
            <span > /* user list for text forwarding */
              {this.props.users.map((u) => <ul>
                  <li onClick={()=>this.setState({fid: u.id})}> /* sets the forward id "fid" to the user id"uid" selected */
                    {u.name}{this.state.fid==u.id? <span class="dot"></span> : null}
                     </li></ul>)}
             </span>
          <button onClick={()=> this.props.forwardText(this.state.fid, this.state.uID)}>send</button> /* forward text button */
         </Box>}/>

    </span>
   </div>) : null)))}

   </section>
</Box>

</Box>

<TextInput onChange={this.onSendMessage}
  value={this.state.message}
  placeholder="send message"
  onKeyPress={ this.onEnterSend.bind(this)}/>

<Button onClick={()=> { this.setState({message:''})}}> cancel </Button>

<Button onClick={() => {this.state.id =='e' ? alert("select user") : this.props.sendMessage(this.state.message, this.state.id);
this.setState({message:''}) }}> send </Button>

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
      sendMessage, addUser, removeUser, editText, forwardText
    },dispatch)
}



export default connect( mapStateToProps, mapDispatchToProps )(ChatField);
