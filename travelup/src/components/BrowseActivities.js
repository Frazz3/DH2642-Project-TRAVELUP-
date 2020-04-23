import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, Button, } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchActivities } from "../actions/activityActions"
import { addActivity } from "../actions/tripActions"

const activity_subcategory = [{label:"Nightlife",code: "20",state:"nightlife"},{label:"Shopping",code: "26",state:"shopping"},{label:"Food & Drink",code: "36",state:"foodDrink"},{label:"Spas & Wellness",code: "40",state:"spasWellness"},{label:"Classes & Workshops",code: "41",state:"classesWorkshops"},{label:"Tours",code:"42",state:"tours"},{label:"Sights & Landmarks",code:"47",state:"sightsLandmarks"},{label:"Zoos & Aquariums",code:"48",state:"zoosAquariums"},{label:"Museums",code:"49",state:"museums"},{label:"Water & Amusement Parks",code:"52",state:"waterAmusementParks"},{label:"Casinos & Gambling",code:"53",state:"casinosGambling"},{label:"Boat Tours & Water Sports",code:"55",state:"boatToursWaterSports"},{label:"Fun & Games",code:"56",state:"funGames"},{label:"Nature & Parks",code:"57",state:"natureParks"},{label:"Concerts & Shows",code:"58",state:"concertsShows"},{label:"Transportation",code:"59",state:"transportation"},{label:"Traveler Resources",code:"60",state:"travelerResources"},{label:"Outdoor Activities",code:"61",state:"outdoorActivities"},{label:"Events",code:"62",state:"events"},{label:"All",code: "0",state:"allCategories"}]
const activity_rating = [{label : "Terrible", code: "1", state:"terrible"},{label: "Poor",code : "2",state:"poor"},{label:"Average",code: "3",state:"average"},{label:"Very good",code:"4",state:"veryGood"},{label:"Excellent",code:"5",state:"excellent"},{label:"All",code: "all",state:"allRatings"}]

class BrowseActivities extends React.Component {
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
  this.props.fetchActivities(this.props.location_id);
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

addActivity = (activity) => {
  if (window.confirm(activity.description +"\n\nWould you want to add " +activity.name+ " to your trip?")){
    let act = {id:activity.location_id, name:activity.name, price:activity.price, description:activity.description, location_id:activity.location_id}

    // don't want to add duplicates (not sure where to put this, here or in the reducer?)
    let duplicate = false;
    let x;
    for( x of this.props.tripActivities){
      // we have already added that activity
      if(x.id === activity.location_id){
        console.log("ALREADY ADDED")
        duplicate = true;
        alert("You have already added this activity to your trip, choose another one please");
      }
    }
    //only add if it's not already added
    if(!duplicate){
      this.props.addActivity(act);
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

createCheckbox = (label, stateName) => {
    return(
      <FormControlLabel key={stateName}
          control={<Checkbox checked={this.state.stateName} onChange={this.handleChange} name={stateName}/>}
          label={label}/>
    )
  }

  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />

    if(typeof this.props.activities === "undefined"){
      // tills vidare, vill kanske returnera mer
      return(
        <div>
          {this.spinner()}
        </div>
      )
    }
    const activityItems = this.props.activities.map(activity => {
    //const activityItems = activitys_list.map(activity => {
     return ((activity.name && activity.photo )?  // kan behöva fler att filtrera på
      (
        <span key={activity.location_id}>
          <button className={activity.location_id} onClick={()=> this.addActivity(activity)} style={activityButtonStyle}>
            <h4>{activity.name} </h4>
            <img src={activity.photo.images.small.url}/>
            //<h5>Price Range: {activity.price} </h5>
            <p>Address: {activity.address} </p>
          </button>
        </span>

    ):null)});

    const ratingCheckbox = (
      <FormGroup row>
        {activity_rating.map(obj=>{return this.createCheckbox(obj.label,obj.state)})}
      </FormGroup>
    );

    const categoryCheckbox = (
      <FormGroup row>
        {activity_subcategory.map(obj=>{return this.createCheckbox(obj.label,obj.state)})}
      </FormGroup>
    );

    return (
      <section style={containerSection}>

        <div className="filters" style={filterDiv}>
          <div>
              <FormLabel component="legend">Rating</FormLabel>
                <div>{ratingCheckbox}</div>
                <br/>
              <FormLabel component="legend">Category</FormLabel>
                <div>{categoryCheckbox}</div>
        </div>
        <div>
          <Button variant="outlined" onClick={this.handleClick}>
            Filter
          </Button>

        </div>
        </div>
        <div className="activities" style={activityDiv}>
          <h1 style={styleText}>Activities</h1>
          { (this.props.activities.length === 0)? (       // vid varje ny fetch så blir activitys reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
            <div>{this.spinner()}</div>
          ) : activityItems}
        </div>
      </section>

    );
  }
}

const styleText = {
  color: "#239160",
  padding: "10px",
  fontFamily: "Arial",
  textAlign: "center"
}

const containerSection ={
  width:"100%"
}

const activityDiv = {
  width:"100%",
}

const filterDiv = {
  width:"150px",
  float:"left",
  border: "" + 2 + "px solid " + "#239160",
  boxShadow: "1px 1px 5px #888888",
  display: "flex",
  flexDirection: "column",
  display: "flex",
  borderRadius: 8,
}

const activityButtonStyle = {
  width: "300px",
  height: "300px",
  backgroundColor: "white",
  border: "none",
  textAlign: "center",

}

BrowseActivities.propTypes = {
  fetchActivities: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
  auth: state.firebase.auth,
  activities: state.activities.items, //de som är fetchade
  location_id: state.location.id,
  tripActivities: state.trip.activities //de vi lagt till i vår trip
})


const mapDispatchToProps = (dispatch) => {
  return{
    //createTrip: (trip, userID) => dispatch(createTrip(trip, userID))  //createTrip is an action-creator
  }
}

export default connect(mapStateToProps, {fetchActivities, addActivity})(BrowseActivities);
