import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips, deleteTrip, editTrip } from "../actions/allTripsActions";
import AllTrips from "../components/AllTrips";

class AllTripsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTrips: this.props.allTrips,
      show: false,
      dataModal: {},
      modalType: ""
    };
  }

  componentDidMount() {
    if (this.props.userID) {
      this.makeAllTrips();
    }
  }

  componentDidUpdate(prevProps) {
    // Behövs då userID inte ännu hämtats vid första render-tillfället.
    if (this.props.userID !== prevProps.userID) {
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };

  hideModal = () => {
    this.setState({
      show: false
    });
  };

  getModal = (data, type) => {
    this.setState({
      show: true,
      dataModal: data,
      modalType: type
    });
  };

  deleteTheTrip = tripID => {
    if (window.confirm("Do you want to delete this trip?")) {
      this.props.deleteTrip(tripID, this.props.userID);

      console.log("the trip is deleted, id: ", tripID);
    }
  };

  editTheTrip = tripID => {
    if (this.props.locationID !== null) {
      alert(
        "You have already started on a trip, you need to finish that one before you can edit this."
      );
    } else {
      if (window.confirm("Do you really want to edit this trip?")) {
        console.log("editing the trip");
        this.props.editTrip(tripID, this.props.userID);
        //this.props.deleteTrip(tripID, this.props.userID);
      }
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    return (
      <AllTrips
        trips={this.props.allTrips.reverse()}
        deleteTrip={this.deleteTheTrip}
        editTrip={this.editTheTrip}
        getModal={this.getModal}
        hideModal={this.hideModal}
        show={this.state.show}
        dataModal={this.state.dataModal}
        modalType={this.state.modalType}
      />
    );
  }
}
const mapStateToProps = state => {
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
)(AllTripsContainer);
