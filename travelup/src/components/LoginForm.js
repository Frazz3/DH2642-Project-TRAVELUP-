import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="nav-wrapper red darken-3">
        <div className="container">
          <a className="brand-logo">TravelUp</a>
          <ul className="right">
            <li><a href="/">Login</a></li>
            <li><a href="/food">Food</a></li> 
          </ul> 
        </div>
      </nav>
    )
  }
}

export default LoginForm;
