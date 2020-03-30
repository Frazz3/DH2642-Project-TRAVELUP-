import React from "react"
import { Link } from "react-router-dom"
import { Typography, Button } from '@material-ui/core';


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