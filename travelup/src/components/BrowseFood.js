import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/foodActions"

// om man vill göra snyggare lösning kan dessa användas. Görs ej i nuläget eftersom jag ej fick det att funka /Stina
const prices_restaurants = [{"$": "10953"},{"$$-$$$": "10955"},{"$$$$": "10954"},{"all": "all"}]
const restaurant_mealtype = [{"Breakfast": "10597"},{"Lunch": "10598"},{"Dinner": "10599"},{"Brunch": "10606"},{"all": "all"}]

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
  
  render() {
    const restaurantItems = this.props.restaurants.map(restaurant => 
      restaurant.name ? 
      (
      <div key={restaurant.location_id}>
        <h4>{restaurant.name} </h4>
        <h6>Description</h6>
        <p>{restaurant.description}</p>
        <h5>Price Range: {restaurant.price} </h5>
        {restaurant.is_closed ? <h5>Closed</h5> : 
          <h5>{restaurant.open_now_text}</h5>}
        <p>Address: {restaurant.address} </p>
        <br />
      </div>
    ): null);
   

    const priceCheckbox = (
      <FormGroup row>
        {this.createCheckbox("$", "cheap")}
        {this.createCheckbox("$$-$$", "medium")}
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
    
    return (
      <div>
        <div>
            <FormLabel component="legend">Price</FormLabel>
              {priceCheckbox}
            <br/>
            <FormLabel component="legend">Meal type</FormLabel>
              {mealTypesCheckbox}
        </div>
        
        <div>
          <Button variant="outlined" color="secondary" onClick={this.handleClick}>
            Filter
          </Button>
          
        </div>
        <div>
          <h1>Restaurants</h1>
          {restaurantItems}
        </div>
      </div>
      
    );
  }
}

BrowseFood.propTypes = {
  fetchRestaurants: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired
}

const mapStateToProps = state => (
  {
  restaurants: state.restaurants.items,
  location_id: state.location.id,
})

export default connect(mapStateToProps, {fetchRestaurants})(BrowseFood);