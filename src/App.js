import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import ChatField from './components/Chat'

class App extends Component {

  render()
{
    return(
      <div className="App">
      <ChatField/>
      </div>
    );
  }
}


export default App;
