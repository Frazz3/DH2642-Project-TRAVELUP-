import React from "react";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { Redirect } from "react-router-dom";
import {ENDPOINT, API_KEY} from "../apiConfig.js";
import { fetchLocation } from "../actions/plannerActions";
import { resetTrip } from "../actions/tripActions";
import { resetLocation} from "../actions/plannerActions"


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
    console.log("serach location")
    e.preventDefault(); //prevent submitting the default values
    if(this.props.location.id !== null){
      console.log("IT IS NULL")
      if(window.confirm("Do you really want to change you location? You current trip will be deleted in that case.")){
        //reset trip and location
        this.props.resetLocation();
        this.props.resetTrip();
        //fetch new location
        this.props.fetchLocation(this.state.destination) // Vill inte pusha innan fetch är färdig...
        this.props.history.push('/select');

      }else{

      }
    }else{
      this.props.resetLocation(); // Reset the location before searching for a new on.
      this.props.fetchLocation(this.state.destination) // Vill inte pusha innan fetch är färdig...
      this.props.history.push('/select');
    }
    
}

  render() {
    //om vi inte är inloggade ska vi inte kunna se planner-sidan
    console.log(this.props.location)
    
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
          <button className="small_btn" type="submit" >Search</button>
        </div>
        <br />
      </form>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    location: state.location,
  }
}

//behövde sign-out här för att kunna se så att redirecten funkar som den ska, ska senare tas bort
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocation: (destination) => dispatch(fetchLocation(destination)),
    resetTrip: () => dispatch(resetTrip()), 
    resetLocation: () => dispatch(resetLocation())

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Planner);
