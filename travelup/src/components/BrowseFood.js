import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/foodActions"

const prices_restaurants = [{"$": "10953"},{"$$-$$$": "10955"},{"$$$$": "10954"},{"all": "all"}]
const restaurant_mealtype = [{"Breakfast": "10597"},{"Lunch": "10598"},{"Dinner": "10599"},{"Brunch": "10606"},{"all": "all"}]
class BrowseFood extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      priceFilter: "all",
      mealtypeFilter: "all"
    }
  }
  componentWillMount() {
    this.props.fetchRestaurants(this.props.location_id);
  }

  handleChange = event => {
   // this.setState
  };
  
  render() {
    const restaurantItems = this.props.restaurants.map(restaurant => (
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
    ));
    const priceCheckbox = prices_restaurants.map(obj => (
      <FormControlLabel
      control={<Checkbox checked={false} onChange={this.handleChange}/>} label="hej"/>
    )

    ) 
    return (
      <div>
        <h1>Restaurants</h1>
        {restaurantItems}
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