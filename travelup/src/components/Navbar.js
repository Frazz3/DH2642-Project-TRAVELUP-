import React from "react"
import { Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" >
      <Link to="/" style={lnkStyle} activeStyle={lnkStyle}>TravelUp</Link>
    </Typography>
    {links}
  </Toolbar>
</AppBar>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
  }
    
}

export default connect(mapStateToProps)(Navbar);