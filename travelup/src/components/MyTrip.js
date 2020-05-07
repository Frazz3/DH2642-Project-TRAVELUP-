import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { createTrip, removeRestaurant, removeActivity, removeAccommodation, resetTrip } from "../actions/tripActions";
import { resetLocation } from "../actions/plannerActions"
import Button from '@material-ui/core/Button';
import { small_btn, lnk_style, myTrip_container } from '../assets/style' // lyckas inte style Link med css

class MyTrip extends React.Component {
  constructor(props) {
    super(props);

    // osäker om jag kan connecta från mapStateToProps till denna med?
    this.state = {
      country:"",   // måste ha pga databasen, kanske ändra sen
      city:"",      // måste ha pga databasen, kanske ändra sen
      location: this.props.location,
      author: this.props.author,
      restaurants: this.props.restaurants,
      activities: this.props.activities
    };
  }

  replaceUndefined = (value) => {
    if( typeof(value) === "undefined" ){
      return "";
    }
    return value;
  }

  removeRestaurantFromList = (restaurant) => {
    this.props.removeRestaurant(restaurant);
  }

  removeActivityFromList = (activity) => {
    this.props.removeActivity(activity);
  }

  removeAccommodationFromList = (accommodation) => {
    this.props.removeAccommodation(accommodation);
  }

  discardTrip = () => {
    this.props.resetLocation();
    this.props.resetTrip();
  }

  handleClick = () => {

    // need to make sure that no undefined fields are present (only works for restaurants right now)
    this.props.restaurants.map( rest => {
      Object.keys(rest).map(function(key, index) {
        console.log(key)
        console.log(rest[key])
        if( typeof(rest[key]) === "undefined" ){
          rest[key] = "";
        }

       });
    })

    this.props.activities.map( act => {
      Object.keys(act).map(function(key, index) {
        console.log(key)
        console.log(act[key])
        if( typeof(act[key]) === "undefined" ){
          act[key] = "";
        }

       });
    })


    // create a new trip with the values in the props
    let tripToCreate = {
      country: this.props.country,
      city: this.props.city,
      locationID: this.props.locationID,
      location: this.props.location,
      locationPhoto: this.props.locationPhoto,
      author: this.props.author,
      restaurants: this.props.restaurants,
      activities: this.props.activities,
      accommodations: this.props.accommodations
    }


    // ska nollställa alla states med trips, vi börjar på nytt

    this.props.createTrip(tripToCreate, this.props.userID);
    //this.props.createTrip(this.state, this.props.userID);
  };


  render() {
    if(!this.props.location){
      return null   // show nothing if we do not have any trip
    }else{
      let rest = this.props.restaurants?this.props.restaurants.map((r) =>
      <div key={r.location_id}>
        - {r.name}
        <button className="element_delete_btn" onClick={() => this.removeRestaurantFromList(r)}>x</button>
      </div>
      ):null

      let act = this.props.activities?this.props.activities.map((a) =>
      <div key={a.location_id}>
        - {a.name}
        <button className="element_delete_btn" onClick={() => this.removeActivityFromList(a)}>x</button>
      </div>
      ):null

      let acc = this.props.accommodations?this.props.accommodations.map((a) =>
      <div key={a.location_id}>
        - {a.name}
        <button className="element_delete_btn" onClick={() => this.removeAccommodationFromList(a)}>x</button>
      </div>
      ):null

      return (<div className="myTrip_container"> 
        
        <br/>
        <div><b>My trip to {this.props.location}</b></div>
        <div>Restaurants: </div>
        <div> {rest} </div>
        <div>Activities: </div>
        <div>{act} </div>
        <div>Accommodations: </div>
        <div>{acc} </div>
        <Link to="/allTrips" style={lnk_style} activeStyle={lnk_style} > 
          <button className="small_btn" variant="outlined" onClick={this.handleClick}>
            Add trip
          </button>
        </Link>  
        <Link to="/planner" style={lnk_style}>
          <button className="small_btn" variant="outlined" onClick={this.discardTrip}>
            Discard trip 
          </button>
        </Link>

        </div>);
  }
  }
}


const mapStateToProps = (state) => {
  console.log("map state")
  return {
    country: "",
    city: "",
    locationID: state.location.id,
    location: state.location.name,
    locationPhoto: state.location.locationPhoto,
    author: state.firebase.auth.uid,  // should probably change to name later
    restaurants: state.trip.restaurants,
    userID: state.firebase.auth.uid,
    activities: state.trip.activities,
    accommodations: state.trip.accommodations,
    locationError: state.location.locationError

  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTrip: (trip, userID) => dispatch(createTrip(trip, userID)), //createTrip is an action-creator
    removeRestaurant: restaurant => dispatch(removeRestaurant(restaurant)),
    removeActivity: activity => dispatch(removeActivity(activity)),
    removeAccommodation: accommodation => dispatch(removeAccommodation(accommodation)),
    resetTrip: () => dispatch(resetTrip()),
    resetLocation: () => dispatch(resetLocation())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);
