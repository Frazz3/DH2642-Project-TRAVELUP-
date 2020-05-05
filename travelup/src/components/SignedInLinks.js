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

  const browse = props.location_id ? <li class="nav-item"><a class="nav-link" href="/select">Browse</a></li> : <li class="nav-item" cursor="none" ><a class="nav-link disabled" >Browse</a></li>;


  return (
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item "><a class="nav-link" href="/planner">New Trip<span class="sr-only">(current)</span></a></li>
        {browse}
        <li class="nav-item"><a class="nav-link" href="/allTrips">All My Trips</a></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item"><a class="nav-link" href="/logIn" onClick={props.signOut}>Sign Out</a></li>
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

