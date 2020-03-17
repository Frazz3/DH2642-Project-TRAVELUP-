import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../actions/authActions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault(); //prevent submitting the default values
    console.log(this.state)
    this.props.signIn(this.state); //this.state is the credentials (email and password) from the state of the class
  }


  render() {
    return (
    <div className = "container"> 
    <form onSubmit={this.handleSubmit} className="white">
      <h5 className="grey-test test-darken-3">Sign in</h5>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <button className="ptn pink lighten-1 z-depth-0">Login</button>
      </div>
    </form>

    </div>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
