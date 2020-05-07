import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips, deleteTrip, editTrip } from "../actions/allTripsActions";
import AllTrips from "../components/AllTrips";

class AllTripsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTrips: this.props.allTrips
    };
  }

  componentDidUpdate(prevProps) {
    // Behövs då userID inte ännu hämtats vid första render-tillfället.
    if (this.props.userID !== prevProps.userID) {
      console.log("making trips");
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };

  showRestaurant = rest => {
    let all_cuisine = "";
    if (rest.cuisine) {
      rest.cuisine.map(c => (all_cuisine += c.name + ", "));
    }
    alert(
      rest.name +
        "\n" +
        rest.description +
        "\n" +
        "Price: " +
        rest.price +
        "\nWebsite: " +
        rest.website +
        "\nCuisine: " +
        all_cuisine
    );
  };

  showActivity = act => {
    alert(
      act.name +
        "\n" +
        act.description +
        "\n" +
        "Price: " +
        act.price +
        "\nWebsite: " +
        act.website
    );
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
    return (
      <AllTrips
        trips={this.props.allTrips}
        deleteTrip={this.deleteTheTrip}
        editTrip={this.editTheTrip}
        showRestaurant={this.showRestaurant}
        showActivity={this.showActivity}
      />
    );
  }
}
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
)(AllTripsContainer);
