import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, Button, } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchRestaurants } from "../actions/foodActions"
import { addRestaurant } from "../actions/tripActions"

// om man vill göra snyggare lösning kan dessa användas. Görs ej i nuläget eftersom jag ej fick det att funka /Stina
const prices_restaurants = [{"$": "10953"},{"$$-$$$": "10955"},{"$$$$": "10954"},{"all": "all"}]
const restaurant_mealtype = [{"Breakfast": "10597"},{"Lunch": "10598"},{"Dinner": "10599"},{"Brunch": "10606"},{"all": "all"}]

const restaurants_list = [{location_id: "1381784", name: "Don Camilo", description: "a restaurant", price: "free", address: "some street", photo: {images: {small: {url: "https://media-cdn.tripadvisor.com/media/photo-l/05/ea/91/ff/don-camilo.jpg"}}}}];
const locationID = "187147";


class BrowseFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      /*
      priceFilter: "all",
      mealtypeFilter: "all"
      */

      cheap:false,
      medium:false,
      expensive:false,
      allPrice:false,

      breakfast:false,
      brunch:false,
      lunch:false,
      dinner:false,
      allMealtype:false,

    }
  }
  componentWillMount() {
    // fetches restaurants from the location. No filtering.
    //console.log(this.props.location_id)
    this.props.fetchRestaurants(this.props.location_id);
  }

  handleChange = event => {
    this.setState({ 
      [event.target.name]: event.target.checked });
  };

  handleClick = () => {
    this.setState({
      loading:true
    })

    let restaurant_mealtype = "";
    if (this.state.allMealtype === true){
      restaurant_mealtype = "all";
    }else{
      if(this.state.breakfast === true){
        restaurant_mealtype += "10597,"
      }if(this.state.brunch === true){
        restaurant_mealtype += "10606,"
      }if(this.state.lunch === true){
        restaurant_mealtype += "10598,"
      }if(this.state.dinner === true){
        restaurant_mealtype += "10599,"
      }
    }

    let prices_restaurants = "";
    if (this.state.allPrice === true){
      prices_restaurants = "all";
    }else{
      if(this.state.cheap === true){
        prices_restaurants += "10953,"
      }if(this.state.medium === true){
        prices_restaurants += "10955,"
      }if(this.state.expensive === true){
        prices_restaurants += "10954,"
      }
    }

    // fetches restaurants with new filters
    this.props.fetchRestaurants(this.props.location_id, restaurant_mealtype, prices_restaurants);
  }

  
  createCheckbox = (label, stateName) => {
    return(
      <FormControlLabel key={stateName}
          control={<Checkbox checked={this.state.stateName} onChange={this.handleChange} name={stateName}/>} 
          label={label}/>
    )
  }

  addRestaurant = (restaurant) => {
    if (window.confirm(restaurant.description +"\n\nWould you want to add " +restaurant.name+ " to your trip?")){
      let rest = {id:restaurant.location_id, name:restaurant.name, price:restaurant.price, description:restaurant.description, location_id:restaurant.location_id}

      // don't want to add duplicates (not sure where to put this, here or in the reducer?)
      let duplicate = false;
      let x;
      for( x of this.props.tripRestaurants){
        // we have already added that restaurant
        if(x.id === restaurant.location_id){
          console.log("ALREADY ADDED")
          duplicate = true;
          alert("You have already added this restaurant to your trip, choose another one please");
        }
      }
      //only add if it's not already added
      if(!duplicate){
        this.props.addRestaurant(rest);
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
  
  render() {
    const {auth} = this.props;
    if (!auth.uid) return <Redirect to='/' />

    if(typeof this.props.restaurants === "undefined"){
      // tills vidare, vill kanske returnera mer
      return(
        <div>
          {this.spinner()}
        </div>
      )
    }
    const restaurantItems = this.props.restaurants.map(restaurant => {
    //const restaurantItems = restaurants_list.map(restaurant => {
     return ((restaurant.name && restaurant.photo )?  // kan behöva fler att filtrera på
      (
        <span key={restaurant.location_id}>
          <button className={restaurant.location_id} onClick={()=> this.addRestaurant(restaurant)} style={restaurantButtonStyle}>
            <h4>{restaurant.name} </h4>
            <img src={restaurant.photo.images.small.url}/>
            <h5>Price Range: {restaurant.price} </h5>
            <p>Address: {restaurant.address} </p>
          </button>
        </span>
      
    ):null)});


    const priceCheckbox = (
      <FormGroup row>
        {this.createCheckbox("$", "cheap")}
        {this.createCheckbox("$$-$$$", "medium")}
        {this.createCheckbox("$$$$", "expensive")}
        {this.createCheckbox("All", "allPrice")}
      </FormGroup>
    );

    const mealTypesCheckbox = (
      <FormGroup row>
        {this.createCheckbox("Breakfast", "breakfast")}
        {this.createCheckbox("Brunch", "brunch")}
        {this.createCheckbox("Lunch", "lunch")}
        {this.createCheckbox("Dinner", "dinner")}
        {this.createCheckbox("All", "allMealtype")}
      </FormGroup>
    );
    console.log('items', restaurantItems)
    
    return (
      <div className="container">
      <section style={containerSection}>
        
        <div className="filters" style={filterDiv}>
          <div>
              <FormLabel component="legend">Price</FormLabel>
                <div>{priceCheckbox}</div>
              <br/>
              <FormLabel component="legend">Meal type</FormLabel>
                <div>{mealTypesCheckbox}</div>
          </div>
          
          <div>
            <Button variant="outlined" onClick={this.handleClick}>
              Filter
            </Button>
            
          </div>
        </div>
        <div className="restaurants" style={restaurantDiv}>
          <h1 style={styleText}>Restaurants</h1>
          { (this.props.restaurants.length === 0)? (       // vid varje ny fetch så blir restaurants reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
            <div>{this.spinner()}</div>
          ) : restaurantItems}
        </div>
      </section>
      </div>
      
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

const restaurantDiv = {
  width:"100%",
}

const restaurantButtonStyle = {
  width: "300px",
  height: "300px",
  backgroundColor: "white",
  border: "none",
  textAlign: "center",

}

BrowseFood.propTypes = {
  fetchRestaurants: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired,
  addRestaurant: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
  auth: state.firebase.auth,
  restaurants: state.restaurants.items,
  location_id: state.location.id,
  tripRestaurants: state.trip.restaurants
})


const mapDispatchToProps = (dispatch) => {
  return{
    //createTrip: (trip, userID) => dispatch(createTrip(trip, userID))  //createTrip is an action-creator
  }
}

export default connect(mapStateToProps, {fetchRestaurants, addRestaurant})(BrowseFood);