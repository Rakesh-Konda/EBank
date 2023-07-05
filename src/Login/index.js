import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {name: '', password: '', showError: false, ErrMsg: ''}

  getSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getFailure = Msg => {
    this.setState({ErrMsg: Msg, showError: true})
  }

  Submit = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const UserDetails = {user_id: name, pin: password}
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.getSuccess(data.jwt_token)
    } else {
      this.getFailure(data.error_msg)
    }
  }

  UserName = event => {
    console.log(event.target.value)
    this.setState({name: event.target.value})
  }

  Password = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  render() {
    const {ErrMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="bg">
          <div className="div">
            <div className="ico">
              <img
                className="i"
                src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                alt="website login"
              />
            </div>
            <div className="f">
              <form onSubmit={this.Submit}>
                <h1>Welcome Back!</h1>
                <div className="iio">
                  <label htmlFor="id">User ID</label>
                  <input
                    onChange={this.UserName}
                    className="inp"
                    type="text"
                    id="id"
                    placeholder="Enter User ID"
                  />
                </div>
                <div className="iio">
                  <label htmlFor="password">PIN</label>
                  <input
                    onChange={this.Password}
                    className="inp"
                    type="password"
                    id="password"
                    placeholder="Enter PIN"
                  />
                </div>
                <button type="submit" className="log">
                  Login
                </button>
                {showError && <p className="p">{ErrMsg}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
