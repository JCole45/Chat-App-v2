import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { sendMessage, addUser, selectUser } from '../Actions/actionCreator'
import {connect} from 'react-redux'

class SendOption extends Component {

  constructor (props) {
    super(props)
    this.state = {
        message: '',
        username: ''
    }
      this.onSendMessage = this.onSendMessage.bind(this)
    this.onAddUser= this.onAddUser.bind(this)
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

  onEnter (f) {
    if(f.key==='Enter'){this.props.sendMessage(this.state.message);
    this.setState({message:''}) }
  }

  render() {
    return (
      <div className="App">

      <div id="message input">
      <input onChange={this.onSendMessage}
      value={this.state.message}
      placeholder="send message"
      onKeyPress={this.onEnter.bind(this)}/>
      </div>

      <div id="message buttons">
      <button onClick={()=> { this.setState({message:''})}}> cancel </button>

      <button onClick={() => {this.props.sendMessage(this.state.message);
      this.setState({message:''}) }}> send </button>
      </div>

      <div id="add user input">
      <input onChange={this.onAddUser}
      value={this.state.username}
      placeholder="user name"/>
      </div>

      <div id="add user button">
      <button onClick={()=> {this.props.addUser(this.state.username);
      this.setState({username:''}) }}> add user </button>
      </div>


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      sendMessage, addUser
    },dispatch)
}


export default connect( null, mapDispatchToProps )(SendOption);
