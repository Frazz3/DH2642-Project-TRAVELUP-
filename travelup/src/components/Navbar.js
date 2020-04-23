import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import 'typeface-roboto';
import { connect } from "react-redux";

const lnkStyle = {
  color: 'white',
  textDecoration: 'none',
}

const Navbar = (props) => {
  const {auth} = props;
  console.log(auth);
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;
  return (
  <div className="navBar">
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" >
        <Link to="/" style={lnkStyle} activeStyle={lnkStyle}>TravelUp</Link>
      </Typography>
      {links}
    </Toolbar>
  </AppBar>
  </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
  }
    
}

export default connect(mapStateToProps)(Navbar);