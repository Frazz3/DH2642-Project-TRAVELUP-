import React from "react"
import { Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'

const lnkStyle = {
  color: 'white',
  textDecoration: 'none',
  position:'left'
}

const SignedInLinks = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <ul className='relative'>
        <Button color="inherit"><Link to="/planner" style={lnkStyle} activeStyle={lnkStyle}>Planner</Link></Button>
        <Button color="inherit"><Link to="/select" style={lnkStyle} activeStyle={lnkStyle}>Select</Link></Button>
        <Button color="inherit"><Link to="/allTrips" style={lnkStyle} activeStyle={lnkStyle}>All Trips</Link></Button>
        <Button color="inherit" style={{ position:'right' }} onClick={() => { props.signOut(); }}>Sign Out</Button>
      </ul>
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),

  }
}
export default connect(null, mapDispatchToProps)(SignedInLinks);

