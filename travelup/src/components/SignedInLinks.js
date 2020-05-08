import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { resetTrip } from '../actions/tripActions'
import { resetLocation } from '../actions/plannerActions'


// When we sign out we need to reset everything we have started on
const signOutFunc = (props) => {
  if (window.confirm("Signing out will discard any unsaved changes to your trip. Do you still want to sign out?")) {
    props.resetLocation();
    props.resetTrip();
    props.signOut();
  } // else, do nothing

}

const SignedInLinks = (props) => {

  const browse = props.location_id ? <Link to="/select" ><button type="button" class="btn btn-outline-light btn-sm">Browse</button></Link> : <span><button type="button" class="btn btn-outline-light btn-sm" disabled>Browse</button></span>;


  return (
    <div class="navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <Link to="/planner" ><button type="button" class="btn btn-outline-light btn-sm">New Trip</button></Link>
        {browse}
        <Link to="/allTrips" ><button type="button" class="btn btn-outline-light btn-sm">All My Trips</button></Link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <Link to="/logIn" onClick={() => signOutFunc(props)}><button type="button" class="btn btn-outline-light btn-sm">Sign Out</button></Link>
      </ul>
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    resetTrip: () => dispatch(resetTrip()),
    resetLocation: () => dispatch(resetLocation()),
  };
};

const mapStateToProps = state => (
  {
    location_id: state.location.id
  })

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);

