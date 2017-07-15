import React, { Component } from 'react'

class Video extends Component {
  componentWillReceiveProps(nextProps) {
    const { localSrc, remoteSrc } = nextProps
    if (localSrc) {
      this.localVideo.src = localSrc
    }
    if (remoteSrc) {
      this.remoteVideo.src = remoteSrc
    }
  }
  handleCall = () => {
    this.props.handleCall(this.callInput.value)
  }
  render() {

    return (
      <div className='Video'>
        <video ref={(video) => this.localVideo=video} autoPlay></video>
        <video ref={(video) => this.remoteVideo=video} autoPlay></video>

        <div class = "row text-center">
            <input ref={(input) => this.callInput=input} type="text" placeholder="username to call" />
            <button onClick={this.handleCall}>Call</button>
            <button>Hang Up</button>
        </div>

      </div>
    )
  }
}

export default Video
