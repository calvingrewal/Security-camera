import React, { Component } from 'react'

class Login extends Component {
  handleLogin = () => {
    this.props.handleLoginBtnClick(this.usernameInput.value)
  }
  render() {
    return (
      <div class="Login">

       <div>
          <h2>Login</h2>

          <label htmlFor="usernameInput">Login</label>
          <input ref={(input) => this.usernameInput=input} type="email" id="usernameInput" placeholder="username" />

          <button onClick={this.handleLogin}>Sign in</button>
      </div>

     </div>
    )
  }
}

export default Login
