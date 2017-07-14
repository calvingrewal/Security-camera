import React, { Component } from 'react'

class Video extends Component {
  
  render() {
    return (
      <div className='Video'>
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>

        <div class = "row text-center">
            <input type="text" placeholder="username to call" />
            <button>Call</button>
            <button>Hang Up</button>
        </div>

      </div>
    )
  }
}

export default Video
