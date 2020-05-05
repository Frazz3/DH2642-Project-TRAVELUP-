import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips } from "../actions/allTripsActions";
import AllTrips from "../components/AllTrips";

const mapStateToProps = state => {
  console.log("STATE IN MAP: ", state.allTrips);
  // returns a prop object
  // stateMember: state.stateMember (as mapped in rootreducer).reducerProperty
  return {
    auth: state.firebase.auth,
    userID: state.firebase.auth.uid,
    allTrips: state.allTrips,
    locationID: state.location.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllTrips: userID => dispatch(getAllTrips(userID)),
    deleteTrip: (tripID, userID) => dispatch(deleteTrip(tripID, userID)),
    editTrip: tripID => dispatch(editTrip(tripID))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "trips" }]) // Listening to changes in trips collection
)(AllTrips);
