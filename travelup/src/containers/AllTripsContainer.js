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
    this.props.deleteTrip(tripID, this.props.userID);
    this.setState({
      show: false
    })
  }

  editTheTrip = tripID => {
    if (this.props.locationID !== null) {
      this.getModal(tripID, "finish")
    } else {
      this.props.editTrip(tripID, this.props.userID);
      this.setState({
        show: false
      })
      this.props.history.push('/select');
      //this.props.deleteTrip(tripID, this.props.userID);
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
