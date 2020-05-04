import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips, deleteTrip, editTrip } from "../actions/allTripsActions";
import { Redirect } from "react-router-dom";
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
    this.makeAllTrips();

    // vill vi fortfarande ha detta?
    if (this.props.userID !== prevProps.userID) {
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };


  // Create our own alert later, preferrably with a photo in it
  showRestaurant = (rest) => {
    let all_cuisine =  "";
    if(rest.cuisine){
      rest.cuisine.map( c => all_cuisine += c.name + ", ");
    }
    alert(rest.name + "\n" + rest.description + "\n" + "Price: " + rest.price + "\nWebsite: " + rest.website +"\nCuisine: " + all_cuisine)
  }

  showActivity = (act) => {
    alert(act.name + "\n" + act.description + "\n" + "Price: " + act.price + "\nWebsite: " + act.website) 
  }

  deleteTheTrip = (tripID) => {
    if(window.confirm("Do you want to delete this trip?")){
      this.props.deleteTrip(tripID, this.props.userID);
      
      console.log("the trip is deleted, id: ", tripID);
    }
  }

  editTheTrip = (tripID) => {
    if(this.props.locationID !== null){
      alert("You have already started on a trip, you need to finish that one before you can edit this.");
    }else{
      if(window.confirm("Do you really want to edit this trip?")){
        console.log("editing the trip");
        this.props.editTrip(tripID, this.props.userID);
        //this.props.deleteTrip(tripID, this.props.userID);
      }
    }

  }

  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />

    console.log("props in render: ", this.props.allTrips);
    const trips = this.props.allTrips.reverse();  // The newest trip comes first
    let i = 0;
    const userTripItems = trips.map(trip => (
      <div key={trip.id} className="all_trips">
        <button className="delete_btn" onClick={() => this.deleteTheTrip(trip.id)}>X</button>
        <button className="delete_btn" onClick={() => this.editTheTrip(trip.id)}>...</button>
        <h2 className="large_text">
          {++i}. {trip.location}
        </h2>
        <img className="all_trips_img" src={trip.locationPhoto}/>
        <h5 className="medium_text">Restaurants</h5>
        {trip.restaurants?(
          trip.restaurants.map(rest => (
          <h6 key={rest.id} className="small_text" onClick={ () => this.showRestaurant(rest) }> {rest.name} </h6>
        ))):null}
        <h5 className="medium_text">Activities</h5>
        {trip.activities?(
          trip.activities.map(act => (
          <h6 key={act.id} className="small_text" onClick={ () => this.showActivity(act) }> {act.name} </h6>
        ))):null}
        <h6>-------------</h6>
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
