import React from "react";
import { connect } from "react-redux";
import { signOut } from '../actions/authActions'

class Planner extends React.Component {
  constructor(props) {
    super(props);
  }

handleClick = () => {
    this.props.signOut();
}

  render() {
    //lägg in en redirect till log-in ifall vi ej är inloggade (se LoginForm hur man gör)
    //if (auth.uid) return <Redirect to='/' />

    return (
    <div className = "container">
      <div> PLANERA </div>
      <div>
        <button onClick = {this.handleClick} >Sign out (ska tas bort sen)</button>
    </div>
    </div>);
  }
}

//behövde sign-out här för att kunna se så att redirecten funkar som den ska, ska senare tas bort
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}


export default connect(null, mapDispatchToProps)(Planner);
