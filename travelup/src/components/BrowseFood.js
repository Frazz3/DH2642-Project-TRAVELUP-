import React from "react";
import {ENDPOINT, API_KEY} from "../apiConfig.js";

class BrowseFood extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      restaurants: []
    }
  }

  componentWillMount(){
    fetch(ENDPOINT+"list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&prices_restaurants=10953%252C10955&restaurant_mealtype=10598%252C10599&currency=USD&lang=en_US&location_id=293919", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    })
  .then(response => response.json())
  .then(data => this.setState({ restaurants: data.data }))
  }

  render() {
    const restaurantItems = this.state.restaurants.map(restaurant => (
      <div key={restaurant.location_id}>
        <h4>{restaurant.name} </h4>
        <h6>Description</h6>
        <p>{restaurant.description}</p>
        <h5>Price Range: {restaurant.price} </h5>
        {restaurant.is_closed ? <h5>Closed</h5> : 
          <h5>{restaurant.open_now_text}</h5>}
          <br />
      </div>
    ));
    return (
      <div>
        <nav className="nav-wrapper red darken-3">
          <div className="container">
            <a className="brand-logo">TravelUp</a>
            <ul className="right">
              <li><a href="/">Login</a></li>
              <li><a href="/food">Food</a></li> 
            </ul> 
          </div>
        </nav>
        <h1>Restaurants</h1>
        {restaurantItems}
      </div>
    );
  }
}

export default BrowseFood;
