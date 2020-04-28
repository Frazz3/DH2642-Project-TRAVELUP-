import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, Button, } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchActivities } from "../actions/activityActions"
import { addActivity } from "../actions/tripActions"

class BrowseAcc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nightlife:false,
        shopping:false,
        foodDrink:false,
        spasWellness:false,
        classesWorkshops:false,
        tours:false,
        sightsLandmarks:false,
        zoosAquariums:false,
        museums:false,
        waterAmusementParks:false,
        casinosGambling:false,
        boatToursWaterSports:false,
        funGames:false,
        natureParks:false,
        concertsShows:false,
        transportation:false,
        travelerResources:false,
        outdoorActivities:false,
        events:false,
        allCategories:false,
  
        terrible:false,
        poor:false,
        average:false,
        veryGood:false,
        excellent:false,
        allRatings:false,
    }
  }
  componentWillMount() {
    // fetches activityCategory from the location. No filtering.
    //console.log(this.props.location_id)
    this.props.fetchAcc(this.props.location_id);
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.checked });
  };
  
  stringFunc = (name) => {
    let str = "this.state."+name
    return str
  }
  handleClick = () => {
    this.setState({
      loading:true
    })
  
    let activityRating = ""
    activity_rating.map(obj=>
      {let name = obj.state;
      let stName = this.stringFunc(name);
      if(eval(stName) === true){
        activityRating += obj.code+",";
    };
    })
  
    let activityCategory = ""
    activity_subcategory.map(obj=>
      {let name = obj.state;
      let stName = this.stringFunc(name);
      if(eval(stName) === true){
        activityCategory += obj.code+",";
    };
    })
    if(activityCategory.charAt(activityCategory.length-1) === ","){
      activityCategory = activityCategory.slice(0,activityCategory.length-1);
    }
    if(activityRating.charAt(activityRating.length-1) === ","){
      activityRating = activityRating.slice(0,activityRating.length-1);
    }
    this.props.fetchActivities(this.props.location_id, activityCategory, activityRating);
  
  }
  
  addAccommodation = (acc) => {
    if (window.confirm(activity.description +"\n\nWould you want to add " +activity.name+ " to your trip?")){
      let act = {id:activity.location_id, name:activity.name, price:activity.price, description:activity.description, location_id:activity.location_id}
  
      // don't want to add duplicates (not sure where to put this, here or in the reducer?)
      let duplicate = false;
      let x;
      for( x of this.props.tripAccommodations){
        // we have already added that activity
        if(x.id === acc.location_id){
          console.log("ALREADY ADDED")
          duplicate = true;
          alert("You have already added this activity to your trip, choose another one please");
        }
      }
      //only add if it's not already added
      if(!duplicate){
        this.props.addAccommodation(acc);
      }
  
    }else{
      console.log('do not add');
    }
  }
  
  spinner = () => {
    return (
      <div className="spinner" key="spinner">
        <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
      </div>
    )
  }
}