import React from "react"
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import 'typeface-roboto';
import { connect } from "react-redux";
import { lnk_style } from '../assets/style'

const Navbar = (props) => {
  const {auth} = props;
  console.log(auth);
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;
  return (
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark teal darken-2">
      <a class="navbar-brand" href="/">TravelUp</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
        aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      {links}
    </nav>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
  }
    
}


export default connect(mapStateToProps)(Navbar);