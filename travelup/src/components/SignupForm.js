import React from "react";
import { connect } from 'react-redux';
import { signUp } from '../actions/authActions'
import { Redirect } from "react-router-dom";


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault(); //prevent submitting the default values
    this.props.signUp(this.state);
  }


  render() {

    // om vi är inloggad ska vi inte kunna signa up
    const {auth} = this.props;
    if (auth.uid) return <Redirect to='/planner' />


    return (
    <div className = "container"> 
    <form onSubmit={this.handleSubmit} className="white">
      <h5 className="grey-test test-darken-3">Sign up</h5>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <label htmlFor="fistName">First Name</label>
        <input type="text" id="firstName" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={this.handleChange}/>
      </div>
      <div className="input-field">
        <button className="ptn pink lighten-1 z-depth-0">Sign up</button>
      </div>
    </form>

    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
