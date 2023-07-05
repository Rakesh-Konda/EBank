import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="nd">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
          alt="not found"
          className="not"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    )
  }
}
export default NotFound
