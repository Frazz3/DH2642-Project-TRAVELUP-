import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { createTrip } from "../actions/tripActions";
import Button from '@material-ui/core/Button';

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
      location: this.props.location,
      author: this.props.author,
      restaurants: this.props.restaurants,
      activities: this.props.activities
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
      </div>
      ):null

      let act = this.props.activities?this.props.activities.map((a) =>
      <div key={a.location_id}>
        - {a.name}
      </div>
      ):null

      return (<div style={myTripContainer}>
        <Button variant="outlined" onClick={this.handleClick}>
          <Link to="/planner" style={lnkStyle} activeStyle={lnkStyle} >Add trip</Link>
        </Button>
        <br/>
        <div><b>My trip to {this.props.location}</b></div>
        <div>Restaurants: </div>
        <div> {rest} </div>
        <div>Activities: </div>
        <div>{act} </div>

        </div>);
  }
  }
}

const lnkStyle = {
  color: 'black',
  textDecoration: 'none',
  position:'left'
}

const myTripContainer= {
  width: 300,
  display: "flex",
  flexDirection: "column",
  borderRadius: 8,
  border: "" + 2 + "px solid " + "#239160",
  boxShadow: "1px 1px 5px #888888",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
}

const addTripButton = {

}


const mapStateToProps = (state) => {
  console.log("map state")
  return {
    country: "",
    city: "",
    location: state.location.name,
    author: state.firebase.auth.uid,  // should probably change to name later
    restaurants: state.trip.restaurants,
    userID: state.firebase.auth.uid,
    activities: state.trip.activities

  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTrip: (trip, userID) => dispatch(createTrip(trip, userID)) //createTrip is an action-creator
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);
