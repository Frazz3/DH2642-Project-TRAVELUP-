import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { resetTrip } from '../actions/tripActions'
import { resetLocation } from '../actions/plannerActions'

const lnkStyle = {
  color: 'white',
  textDecoration: 'none',
  position:'left'
}

// When we sign out we need to reset everything we have started on
const signOutFunc = (props) => {
  if(window.confirm("If you sign out now your changes will be discarded. Do you still wan't to sign out?")){
    props.resetTrip();
    props.resetLocation();
    props.signOut();
  } // else, do nothing
  
}

const SignedInLinks = (props) => {

  const browse = props.location_id ? <Link to="/select" ><button type="button" class="btn btn-outline-light btn-sm">Browse</button></Link> : <button type="button" class="btn btn-outline-light btn-sm"  disabled>Browse</button>;


  return (
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
      <ul class="navbar-nav mr-auto">
        <Link to="/planner" ><button type="button" class="btn btn-outline-light btn-sm">New Trip</button></Link>
        {browse}
        <Link to="/allTrips" ><button type="button" class="btn btn-outline-light btn-sm">All My Trips</button></Link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <Link to="/logIn" onClick={props.signOut}><button type="button" class="btn btn-outline-light btn-sm">Sign Out</button></Link>
      </ul>
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    resetTrip: () => dispatch(resetTrip()),
    resetLocation: () => dispatch(resetLocation()),

  }
}

const mapStateToProps = state => (
{
  location_id: state.location.id
})

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);

