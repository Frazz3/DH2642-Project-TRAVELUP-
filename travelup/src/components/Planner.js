import React from "react";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'
import { Redirect } from "react-router-dom";


class Planner extends React.Component {
  constructor(props) {
    super(props);
  }

handleClick = () => {
    this.props.signOut();
}

  render() {
    // om vi inte är inloggade ska vi inte kunna se planner-sidan
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />


    return (
    <div className = "container">
      <div> PLANERA </div>
      <div>
        <button onClick = {this.handleClick} >Sign out (ska tas bort sen)</button>
    </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

//behövde sign-out här för att kunna se så att redirecten funkar som den ska, ska senare tas bort
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Planner);
