import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null
    }
  }

  handleClickLogin = () => {
    console.log('login')
    this.setState({
      action: 'login'
    })
  }

  handleClickSignUp = () => {
    console.log('signup')
    this.setState({
      action: 'signup'
    })
  }



  render() {

    // om vi är inloggade ska vi inte kunna gå tillbaka till start-sidan
    const {auth} = this.props;
    if (auth.uid) return <Redirect to='/planner' />

    if (this.state.action){
      if (this.state.action==='login'){
        return <Redirect to='/logIn' />
      }
      if (this.state.action==='signup'){
        return <Redirect to='/signUp' />
      }
    }
    
    // <Button variant="outlined" color="secondary" id = 'login' onClick={this.handleClickLogin}>Log in</Button>
    // <Button variant="outlined" color="secondary" id= 'signup' onClick={this.handleClickSignUp}>Sign Up</Button>
    return (
    <div className = "container"> 
      <b> Welcome to TravelUp </b>
      <br/>
      <i>you personal trip planner</i>
      <br/>
      <button className="small_btn" id = 'login' onClick={this.handleClickLogin}>Log in</button>
      <button className="small_btn" id= 'signup' onClick={this.handleClickSignUp}>Sign Up</button>
      <br/>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}



export default connect(mapStateToProps)(Start);
