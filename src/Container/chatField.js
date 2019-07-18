import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { sendMessage, addUser, removeUser, editText, forwardText, getReplies, userProfile, fetchPost } from '../Actions/actionCreator'
import {connect} from 'react-redux'
import '../App.css';
import { Box, Grommet, Clock, TextInput, Text, Select, DropButton, TextArea } from 'grommet';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {app, sign } from '../base';
import FileUploader from 'react-firebase-file-uploader'; 
import firebase from 'firebase';
import Rebase from 're-base';
import 'firebase/auth';
import Details from '../Authentication/Details';
import {FormDown, UserAdd, Attachment, Down, Send, Edit, More} from 'grommet-icons';


const base = Rebase.createClass(app.database());
const holding = []
const data = [{message:"sco",id:1},{message:"pa",id:2}]
var info = data.sort(function(a,b){
  return new Date(b.date) - new Date(a.date);
});
  const replyList = document.querySelector("#query-m");
  const now = new Date;

  const randNo =  now.getDay() + now.getSeconds() + "ab"   


class ChatField extends Component {
  constructor (props) {
    super(props)
    this.state = {
        user: '',
        message: 'w',
        final: '',
        username: '',
        id: 0,
        fid:1,
        uID: 'e',
        edit: '',
        value: 'medium',
        s: 'forward',
        image: '',
        imageURL: [false],
        time: new Date,
        replyid: [],
        nickname: '',
        dp: '',
        user: '',
        identifier: ''
    }

    this.onAddUser= this.onAddUser.bind(this)
    this.onAddId = this.onAddId.bind(this)
    this.onRemoveUser = this.onRemoveUser.bind(this)
    this.onAlertTest = this.onAlertTest.bind(this)
    this.onDisplay =  this.onDisplay.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onEnterSend = this.onEnterSend.bind(this)
    this.onGetMessage = this.onGetMessage.bind(this)
    this.onUserProfile = this.onUserProfile.bind(this)
    this.authListener = this.authListener.bind(this)

  }

  authListener() {
    sign.onAuthStateChanged((user)=> {
      if(user){
        this.setState({user: user.displayName}); 
      } else {
        this.setState({user: null})
      }
    })
  }


  componentDidMount() {
    this.authListener();
    
    sign.onAuthStateChanged((user)=>{
     if(user) {
      this.props.fetchPost(user.displayName);
     }
    })
    console.log(this.state.user)
  }

  componentWillMount()  {
    this.chatRef = base.syncState('mesage', {
      context: this,
      state: 'message'
    })

    this.username = base.syncState('username', {
      context: this,
      state: 'username'
    })

    this.id = base.syncState('id', {
      context: this,
      state: 'id'
    })

  }
   
  
  onUserProfile (e, f) {
    this.setState({nickname: e.target.value, dp: f})
  }


  onAddUser(d){
    this.setState({
      username: d.target.value
    })
  }

  onAddId(e, f){
    this.setState({
      id: e,
      username: f
    })
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

  onEditText(e, f) {
    let d = prompt("edit text below")
    e=='edit' ?
    this.props.editText(f , d) 
    : this.props.forwardText(this.state.id, this.state.uID, this.setState({id: this.state.uID}));
alert(this.state.identifier)
  }

  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
    })
    firebase.storage().ref('Images').child(filename).getDownloadURL()
    .then(url=> this.setState({
      imageURL: url
    }))
  }

  onSendMessage(e) {
    this.setState({
      message: e.target.value
    });     

  }


  renderReply (doc) {
    let li = document.createElement('li');
    let mes = document.createElement('span')

    li.setAttribute('data-id', doc.message)
    mes.textContent = doc.data().message;

    li.appendChild(mes)

    replyList.appendChild(li)
  }

  onEnterSend (f) {
    if(f.key==='Enter'){this.props.sendMessage(this.state.message, this.state.imageURL, this.state.user, this.state.id);
    this.setState({message:''}) }
  }

  onGetMessage () {
    this.props.getReplies(this.state.id)
  }



  render ()
  {  console.log(this.props)
     var visual;
     const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;




    return (
      <React.Fragment>
      <CssBaseline/>
  <div>


<button onClick={()=> app.auth().signOut() }>Sign Out</button>
<button onCliick={()=> this.componentDidMount()}>Refresh</button>

       
      <div className="Second User">

      
           <input onChange={this.onAddUser}
           value={this.state.username}
           placeholder="user name"
           size="small"
           onKeyPress={ this.onEnterAdd.bind(this)}/>

           <Button color="primary" variant="outlined" onClick={()=>
             {this.props.addUser(this.state.username);
           this.setState({username:''}) }}> add user </Button>



<Box
  direction="row"
  border={{ color: 'brand', size: 'large' }}
  pad="large" round="true" width="xlarge" height="medium"
>

  <Box className="user box" pad="medium" background="dark-3" width="small" overflow="scroll">

   {/*User List on the Right */}
  <div class="head"><Text color="Purple"> Users: </Text></div>
  <div className="userList">

    {this.props.users.map( (u) =>
      (<div class="users"><span onClick={()=> {this.onAddId(u.name, u.name)} }>
          {this.state.id==u.id? <span class="dot"></span> : null}{u.name}

          <Select
            options={['info', 'delete']}
            value={<More size="small"/>}
            onChange={({ option }) => this.onAlertTest(option)}/>

         </span></div> ))}
       </div>
</Box>

  <Box pad="large" background="light-3" animation={3>4? "slideDown" : null} width="large" overflow="scroll">
  <section className="First User">

  {this.props.users.map((u)=> (u.id==this.state.id? <Text color="red">{u.name}</Text> : null))}

  {(this.props.text.map( (t)=> (t.id==this.state.id?
    (
      
  <div >
  {/* SENT MESSAGES */}
   {t.recieved == false ? <div class="sent">  
                        {/*  <div class="mine messages"> 
                          <div class="message last">  */}

<Select options={['edit']}
 value={<Edit  size='small'/>} onChange={({option}) => 
 this.onEditText(option, t.identifier) } onClick={()=> alert(t.identifier)} alignSelf="center" size="small" 
 style={{width:'5%', height:10}}
    /> 


{/*forward*/}
<DropButton
label= {<Send size='small'/>} 
style={{width:'7%', height:30}}
dropAlign={{ top: 'bottom', right: 'right' }}
size="small"
dropContent={

<Box pad="large" background="light-2">
  <span class="forward"> {/* user list for text forwarding */}
  <div class="head"><Text color="Purple"> Forward message to: </Text></div>
  <div class="forwardList">
    {this.props.users.map((u) => <ul>
        <li onClick={()=>this.setState({fid: u.id, final:  t.text, s: this.props.text.map((t)=> t.identifier)})}> {/* sets the forward id "fid" to the user id"uid" selected */}
          {u.name}{this.state.fid==u.id? <span class="dot"></span> : null}
           </li></ul>)} </div>
   </span>
<Button color="primary" variant="outlined" onClick={()=> this.props.forwardText(this.state.fid, this.state.user, this.state.final, randNo, this.state.s )}>send</Button> {/* forward text button */}
</Box>}/>

<span  onClick={()=> this.setState({uID:t.uID, identifier: t.identifier})}>

{t.text}{ t.image > 6   ? <img src={t.image} width="80" height="75"/> : null } <span class="time-right">{t.time} </span> 



<span>
 {t.reply}  
</span>


</span>
    {/*</div> </div> */}
   </div> : <div class="recieved"> 

     {/* RECEIVED MESSAGES */}

    <span  onClick={()=> this.setState({uID:t.uID})}>


<DropButton
label={<Send size='small'/>}
style={{width:'7%', height:30}}
dropAlign={{ top: 'bottom', right: 'right' }}
size="small"
dropContent={

<Box pad="large" background="light-2">
  <span class="forward"> {/* user list for text forwarding */}
  <div class="head"><Text color="Purple"> Forward message to: </Text></div>
    <div class="forwardList">
    {this.props.users.map((u) => <ul>
        <li onClick={()=>this.setState({fid: u.id, final:  t.text, s: this.props.text.map((t)=> t.identifier)})}> {/* sets the forward id "fid" to the user id"uid" selected */}
          {u.name}{this.state.fid==u.id? <span class="dot"></span> : null}
           </li></ul>)} </div>
   </span>
<Button onClick={()=> this.props.forwardText(this.state.fid, this.state.user, this.state.final, randNo, this.state.s )} color="primary" variant="outlined">send</Button> {/* forward text button */}
</Box>}/>

<div >{t.text}{ t.image ?  null : <div><img src={t.image} width="80" height="75"/></div> } <span >{t.time} </span></div>


<span>
 {t.reply}  
</span>


</span>

   </div>}
 
              </div>) : null)))}

  <div >
    {info.length ? 
    info.map ((cat)=> cat.id == 0 ? (
      <div class="container">
  <img src="/w3images/bandmember.jpg" alt="Avatar"/>
  <p>{cat.message}</p>
  <span class="time-right">{cat.time}</span>
  
  <DropButton
       style={{width:'20%', height:30}}
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
          <button onClick={()=> this.props.forwardText(this.state.fid, this.state.uID)} color="primary" variant="outlined">send</button> /* forward text button */
         </Box>}/>


</div>

      
 ): null ) : (<div>{"still loading"}</div>)
      
    }
  

  
  </div>  

   </section>
</Box>

</Box>


<TextInput onChange={this.onSendMessage}
  value={this.state.message}
  placeholder="type message here..."
  onKeyPress={ this.onEnterSend.bind(this)}/>

<Button onClick={()=> { this.setState({message:''})}}> cancel </Button>

<Button onClick={() => {this.state.id =='e' ? alert("select user") : this.setState({final:this.state.message}); this.props.sendMessage(this.state.message, this.state.imageURL, this.state.user, this.state.id, randNo);
 this.setState({message:'', imageURL:''}) }} color="primary" variant="outlined" > SEND </Button>

<label style={{backgroundColor: 'steelblue', color: 'white', padding: 10,
 borderRadius: 4, pointer: 'cursor'}}>
   <Attachment/>
 <FileUploader
 hidden
accept="image/video/*"
name="image"
storageRef={firebase.storage().ref('Images')}
onUploadSuccess={this.handleUploadSuccess}
/>
 </label>
 {/*<cryptoRun color='plain' size='xlarge' onClick={()=> alert("its here")} />

<CloudDownload color='plain' size='small' onClick={()=> alert("its here")} />
  <Down color='plain' size='large' onClick={()=> alert("its here")} /> */}

 

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
    users: state.Add,
    get: state.Get
  };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      sendMessage, addUser, removeUser, editText, forwardText, getReplies, userProfile, fetchPost
    },dispatch)
}




export default connect( mapStateToProps, mapDispatchToProps )(ChatField);
