import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips } from "../actions/allTripsActions";
import { display } from "@material-ui/system";

class AllTrips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTrips: this.props.allTrips
    };
  }

  componentDidMount() {
    console.log("MOUNTING on ID: ", this.state.userID);
    if (this.props.userID) {
      console.log("ID EXISTS");
      this.makeAllTrips();
    }
  }

  componentDidUpdate(prevProps) {
    console.log("PREV: ", prevProps.userID);
    if (this.props.userID !== prevProps.userID) {
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };

  render() {
    console.log("props in render: ", this.props.allTrips);
    const trips = this.props.allTrips;
    let i = 0;
    const userTripItems = trips.map(trip => (
      <div key={trip.id}>
        <h2>
          {++i}. {trip.city}
        </h2>
        <h6>Author: {trip.author}</h6>
        <h6>-------------</h6>
      </div>
    ));

    return (
      <div>
        <h1>My trips</h1>
        {userTripItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE IN MAP: ", state.allTrips);
  // returns a prop object
  // stateMember: state.stateMember (as mapped in rootreducer).reducerProperty
  return {
    userID: state.firebase.auth.uid,
    allTrips: state.allTrips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllTrips: userID => dispatch(getAllTrips(userID))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "trips" }]) // Listening to changes in trips collection
)(AllTrips);
