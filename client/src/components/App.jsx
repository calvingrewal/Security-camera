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
      connectedUser: null,
      stream: null,
      connection: null
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
      navigator.webkitGetUserMedia({video: true, audio: true}, (stream) => {
        const config = {
         "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
        }
        const connection = new webkitRTCPeerConnection(config)

        this.setState({
          localSrc: window.URL.createObjectURL(stream)
        })

        connection.addStream(stream)

        connection.onaddstream = (e) => {
          this.setState({
            remoteSrc:  window.URL.createObjectURL(e.stream)
          })
        }
        connection.onicecandidate = (e) => {
          if (e.candidate) {
             this.send({
                type: "candidate",
                candidate: e.candidate
             });
          }
        }
        this.setState({
          stream,
          connection
        })
      }, (err) => {
        console.log('ERROR', err)
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
            <Video
              localSrc={this.state.localSrc}
              remoteSrc={this.state.remoteSrc}
            />
            :
            <Login handleLoginBtnClick={this.handleLoginBtnClick}/>
        }

      </div>
    )
  }
}

export default App
