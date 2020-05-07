import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips, deleteTrip, editTrip } from "../actions/allTripsActions";
import { Redirect } from "react-router-dom";
import { display } from "@material-ui/system";
import Modal from './Modal'

class AllTrips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTrips: this.props.allTrips,
      show:false,
      dataModal:{},
      modalType:""
    };
  }

  componentDidMount() {
    console.log("MOUNTING on ID: ", this.state.userID);
    if (this.props.userID) {
      console.log("ID EXISTS");
      this.makeAllTrips();
    }
  }

  hideModal = () => {
    this.setState({
      show:false
    })
  }

  getModal = (data,type) => {
    this.setState({
      show:true,
      dataModal:data,
      modalType:type
    })
  }

  componentDidUpdate(prevProps) {
    console.log("PREV: ", prevProps.userID);
    //this.makeAllTrips();

    // vill vi fortfarande ha detta?
    if (this.props.userID !== prevProps.userID) {
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };

  deleteTheTrip = (tripID) => {
      this.props.deleteTrip(tripID, this.props.userID);
      this.setState({
        show:false
      })
      
      console.log("the trip is deleted, id: ", tripID);
  }

  editTheTrip = (tripID) => {
    if(this.props.locationID !== null){
      this.getModal(tripID,"finnish")
    }else{
        console.log("editing the trip");
        this.props.editTrip(tripID, this.props.userID);

        this.setState({
          show:false
        })
        this.props.history.push('/select');
    }

  }

  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />

    let data = this.state.dataModal;

    console.log("props in render: ", this.props.allTrips);
    const trips = this.props.allTrips.reverse();  // The newest trip comes first
    let i = 0;
    const userTripItems = trips.map(trip => (
      <div key={trip.id} className="all_trips">
        <button className="delete_btn" onClick={()=> {this.getModal(trip.id,"delete")}}>X</button>
        <button className="delete_btn" onClick={()=> {this.getModal(trip.id,"edit")}}>...</button>
        <h2 className="large_text">
          {++i}. {trip.location}
        </h2>
        <img className="all_trips_img" src={trip.locationPhoto}/>
        <h5 className="medium_text">Restaurants</h5>
        {trip.restaurants?(
          trip.restaurants.map(rest => (
          <h6 key={rest.id} className="small_text" onClick={() => this.getModal(rest,"o")}> {rest.name} </h6>
        ))):null}
        <h5 className="medium_text">Activities</h5>
        {trip.activities?(
          trip.activities.map(act => (
          <h6 key={act.id} className="small_text" onClick={() => this.getModal(act,"o")}> {act.name} </h6>
        ))):null}
        <h5 className="medium_text">Accommodation</h5>
        {trip.accommodations?(
          trip.accommodations.map(acc => (
          <h6 key={acc.id} className="small_text" onClick={() => this.getModal(acc,"n")}> {acc.name} </h6>
        ))):null}
        <h6>-------------</h6>
        <Modal show={this.state.show} onClose={this.hideModal} data={this.state.dataModal} case={this.state.modalType} edit={() => this.editTheTrip(data)} delete={() => this.deleteTheTrip(data)}></Modal>
      </div>
    ));

    return (
      <div>
        <h1 className="title_text">My trips</h1>
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
