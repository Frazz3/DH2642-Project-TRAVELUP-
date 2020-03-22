import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions/foodActions"

class BrowseFood extends React.Component {
  componentWillMount() {
    console.log('before fetch', this.props.location_id)
    this.props.fetchRestaurants(this.props.location_id);
  }
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
  console.log('mapstatetoprops', state.location.id),
  {
  restaurants: state.restaurants.items,
  location_id: state.location.id,
})

export default connect(mapStateToProps, {fetchRestaurants})(BrowseFood);