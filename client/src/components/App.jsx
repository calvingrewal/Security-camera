import React, { Component } from 'react'
import io from 'socket.io-client'

import Login from './Login.jsx'
import Video from './Video.jsx'
import './App.sass'

const socket = io()

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      connectedUser: null
    }
    socket.on('message', this.handleMessage)
  }
  handleMessage = message => {
    console.log("Got message", message)

    const data = message

    switch(data.type) {
      case "login":
        this.handleLogin(data.success);
        break;
      case "offer":
        this.handleOffer(data.offer, data.name);
        break;
      case "answer":
        this.handleAnswer(data.answer);
        break;
      case "candidate":
        this.handleCandidate(data.candidate);
        break;
      case "leave":
        this.handleLeave();
        break;
    }
  }
  handleLoginBtnClick = (usernameInput) => {

    if (usernameInput.length > 0) {
       this.send({
          type: "login",
          usernameInput
       });
    }
  }
  handleLogin = success => {
    if (!success) {
      console.log('username taken')
    } else {
      this.setState({
        loggedIn: true
      })
    }
  }
  handleOffer = offer => {

  }
  handleAnswer = answer => {

  }
  handleCandidate = candidate => {

  }
  handleLeave = () => {

  }
  send = (message) => {
  const { connectedUser } = this.state

   if (connectedUser) {
      message.name = connectedUser;
   }

   socket.send(message);
};
  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn ?
            <Video />
            :
            <Login handleLoginBtnClick={this.handleLoginBtnClick}/>
        }

      </div>
    )
  }
}

export default App
