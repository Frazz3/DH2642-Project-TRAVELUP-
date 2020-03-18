import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/authActions'
import { Redirect } from "react-router-dom";

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
    
    this.props.signIn(this.state); //this.state is the credentials (email and password) from the state of the class
  }

  handleClick = () => {
    this.props.signOut();
  }


  render() {
    const { authError, auth } = this.props;
    
    //want to redirect to the planner if we are logged in
    if (auth.uid) return <Redirect to='/planner' />

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
      <div>
        { authError ? <p>{authError}</p> : null}
      </div>
    </form>
    <div>
        <button onClick = {this.handleClick} >Sign out</button>
    </div>

    </div>);
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
