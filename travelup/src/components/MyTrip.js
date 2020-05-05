import React from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { createTrip, removeRestaurant, removeActivity } from "../actions/tripActions";
import Button from '@material-ui/core/Button';
import { small_btn, lnk_style, myTrip_container } from '../assets/style' // lyckas inte style Link med css
import Modal from './Modal'

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
      activities: this.props.activities,
      show:false,
      dataModal:{}
    };
  }

  hideModal = () => {
    this.setState({
      show:false
    })
  }

  getModal = (data) => {
    this.setState({
      show:true,
      dataModal:data
    })
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
      <div>
        <div key={r.location_id} className="myTrip_text" onClick={() => this.getModal(r)}>
        - {r.name}</div>
        <div className="myTrip_text">
          <button className="element_delete_btn" onClick={() => this.removeRestaurantFromList(r)}>x</button>
      </div>
      </div>
      ):null

      let act = this.props.activities?this.props.activities.map((a) =>
      <div><div key={a.location_id} className="myTrip_text" onClick={() => this.getModal(a)}>
        - {a.name}</div>
        <div className="myTrip_text"><button className="element_delete_btn" onClick={() => this.removeActivityFromList(a)}>x</button>
      </div></div>
      ):null

      return (<div className="myTrip_container"> 
        <button className="small_btn" variant="outlined" onClick={this.handleClick}>
          <Link to="/planner" style={lnk_style} activeStyle={lnk_style} >Add trip</Link>  
        </button>
        <br/>
        <div><b>My trip to {this.props.location}</b></div>
        <div>Restaurants: </div>
        <div> {rest} </div>
        <div>Activities: </div>
        <div>{act} </div>
        <Modal show={this.state.show} onClose={this.hideModal} data={this.state.dataModal}></Modal>
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
    activities: state.trip.activities

  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTrip: (trip, userID) => dispatch(createTrip(trip, userID)), //createTrip is an action-creator
    removeRestaurant: restaurant => dispatch(removeRestaurant(restaurant)),
    removeActivity: activity => dispatch(removeActivity(activity))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);
