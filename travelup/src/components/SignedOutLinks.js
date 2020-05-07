import React from "react"
import { Link } from "react-router-dom"

const SignedOutLinks = () => {
  return (
    <div class="navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <Link to="/logIn" ><button type="button" class="btn btn-outline-light btn-sm">Login</button></Link>
        <Link to="/signUp" ><button type="button" class="btn btn-outline-light btn-sm">Sign Up</button></Link>
      </ul>
    </div>
  )
}

export default SignedOutLinks;