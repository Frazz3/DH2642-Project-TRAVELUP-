import React from "react"
import { Link } from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const lnkStyle = {
  color: 'white',
  textDecoration: 'none',
}

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <Button color="inherit"><Link to="/logIn" style={lnkStyle} activeStyle={lnkStyle}>Login</Link></Button>
      <Button color="inherit"><Link to="/signUp" style={lnkStyle} activeStyle={lnkStyle}>Sign Up</Link></Button>
    </ul>

  )
}

export default SignedOutLinks;