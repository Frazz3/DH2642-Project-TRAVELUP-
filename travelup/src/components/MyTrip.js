import React from "react";
//import PropTypes from k
import { connect } from "react-redux";
import { createTrip } from '../actions/tripActions'

class MyTrip extends React.Component {
  constructor(props) {
    super(props);

    // osäker om jag kan connecta från mapStateToProps till denna med?
    this.state = {
      country:"",   // måste ha pga databasen, kanske ändra sen
      city:"",      // måste ha pga databasen, kanske ändra sen
      location: this.props.location,
      author: this.props.author,
      restaurants:this.props.restaurants
      /*
        location: this.props.location,
        activites: this.props.activities
        */
    }

  }

  handleClick = () => {
    // set the state with the current values
    /* Verkar gå för långsamt, behöver kanske inte detta
    
    this.setState({
      country: this.props.country,
      city: this.props.city,
      author: this.props.author,
      restaurants: this.props.restaurants
    })
    */

    // create a new trip with the values in the state
    this.props.createTrip(this.state, this.props.userID)
    
  }

  // hårdkodat till bara en restaurang, man får lösa det med en view eller något sen
  // ex. https://www.youtube.com/watch?v=sh6hZKt-jh0&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=12
  render() {
    console.log('the props',this.props)
    const restaurants = this.props.restaurants;
    console.log('restaurants', restaurants)
    let rest = this.props.restaurants?this.props.restaurants.map((r) => 
    <div key={r.location_id}>
      {r.name} - {r.description}
    </div>
    ):null
    return (<div> 
          <div><b>My trip</b></div>
          <div>Country: {this.props.country}</div>
          <div>City: {this.props.city}</div>
          <div> Location: {this.props.location}</div>
          <div>Author of trip: {this.props.author}</div>
          <div>Restaurants: </div>
          <div> {rest} </div>
          <button onClick={this.handleClick}>Add trip</button>
       </div>);
  }
}

/*
const mapStateToProps = state => {
    return {
    location: state.location, // eventuellt state.location.location
    activities: state.activities
}}*/
const mapStateToProps = (state) => {
  
  return {
    /*
    country: state.trip.country,
    city: state.trip.city,
    */
    location: state.location.name,
    author: state.firebase.auth.uid,  // should probably change to name later
    restaurants: state.trip.restaurants,
    userID: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createTrip: (trip, userID) => dispatch(createTrip(trip, userID))  //createTrip is an action-creator
  }
}

/*
const mapDispatchToProps = dispatch => ({
    setLocation: location => {
        dispatch(setLocation(location))
    },
    addActivity: activity => {
        dispatch(addActivity(activity))
    }
})
*/

export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);