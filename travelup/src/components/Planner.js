import React from "react";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { Redirect } from "react-router-dom";
import {ENDPOINT, API_KEY} from "../apiConfig.js";
import { fetchLocation } from "../actions/plannerActions";


class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: ''
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value} )
  }

  handleClick = () => {
      this.props.signOut();
  }


  handleSubmit(e) {
    e.preventDefault(); //prevent submitting the default values
    this.props.fetchLocation(this.state.destination) // Vill inte pusha innan fetch är färdig...
    setTimeout(() => {  this.props.history.push('/food'); }, 9000); //fullösning ändra till render promise
    
}

  render() {
    //om vi inte är inloggade ska vi inte kunna se planner-sidan
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />


    return (
    <div className = "container">
      <form onSubmit={this.handleSubmit}> 
        <div className="input-field">
          <label htmlFor="destination">Insert Destination:</label>
          <input type="" id="destination" onChange={this.handleChange}/>
        </div>
        <div className="input-field">
          <button type="submit">Search</button>
        </div>
        <br />
      </form>
      <div>
        <button onClick = {this.handleClick} >Sign out (ska tas bort sen)</button>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

//behövde sign-out här för att kunna se så att redirecten funkar som den ska, ska senare tas bort
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    fetchLocation: (destination) => dispatch(fetchLocation(destination))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Planner);
