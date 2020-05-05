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
      <li class="nav-item"><a class="nav-link" href="/logIn">Login</a></li>
      <li class="nav-item"><a class="nav-link" href="/signUp">Sign Up</a></li>
    </ul>
  </div>
  )
}

export default SignedOutLinks;