import React from "react"
import { Link } from "react-router-dom"
import { Typography, Button } from '@material-ui/core';


const lnkStyle = {
  color: 'white',
  textDecoration: 'none',
}

const SignedOutLinks = () => {
  return (
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul class="navbar-nav ml-auto">
      <Link to="/logIn" >  Login </Link>
      <Link to="/signUp" >  Sign Up  </Link>
    </ul>
  </div>
  )
}

export default SignedOutLinks;