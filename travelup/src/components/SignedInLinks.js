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
  return (
    <div style={{position: 'relative'}}>
      <ul className='relative'>
        <Button color="inherit"><Link to="/planner" style={lnkStyle} activeStyle={lnkStyle}>Planner</Link></Button>
        <Button color="inherit"><Link to="/select" style={lnkStyle} activeStyle={lnkStyle}>Select</Link></Button>
        <Button color="inherit"><Link to="/allTrips" style={lnkStyle} activeStyle={lnkStyle}>All Trips</Link></Button>
        <Button color="inherit" style={{ position:'right' }} onClick={() => { signOutFunc(props); }}>Sign Out</Button>
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
export default connect(null, mapDispatchToProps)(SignedInLinks);

