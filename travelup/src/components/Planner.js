import React from "react";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { Redirect } from "react-router-dom";
import {ENDPOINT, API_KEY} from "../apiConfig.js";


class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      location_id: ''
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value} )
  }

  handleClick = () => {
      this.props.signOut();
  }


  handleSearch(e) {
    e.preventDefault(); //prevent submitting the default values
    console.log(this.state.destination)
    fetch(ENDPOINT+"locations/search?limit=30&sort=relevance&offset=0&lang=en_US&currency=SEK&units=km&query="+this.state.destination, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    })
  .then(response => response.json())
  .then(data => {
    this.setState({location_id: data.data[0].result_object.location_id })
    })
  .then(
    console.log('redirect'),
    <Redirect to='/food' />
  )
}

  render() {
    // om vi inte är inloggade ska vi inte kunna se planner-sidan
    // const {auth} = this.props;
    // if (!auth.uid) return <Redirect to='/' />


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
    auth: state.firebase.auth
  }
}

//behövde sign-out här för att kunna se så att redirecten funkar som den ska, ska senare tas bort
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Planner);
