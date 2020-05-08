import React from "react"
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { Link } from "react-router-dom"
import 'typeface-roboto';
import { connect } from "react-redux";

const Navbar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav class="navbar navbar-expand-md navbar-dark teal darken-1">
      <Link className="logo" to="/">TravelUp</Link>
      {links}
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Navbar);