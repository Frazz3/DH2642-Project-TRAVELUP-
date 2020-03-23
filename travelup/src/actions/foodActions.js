import { FETCH_RESTAURANTS } from "./types";
import {ENDPOINT, API_KEY} from "../apiConfig";

export const fetchRestaurants = (location_id) => dispatch => { 
    fetch(ENDPOINT+"restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=50&prices_restaurants=10953%252C10955&restaurant_mealtype=10598%252C10599&currency=SEK&lang=en_US&location_id="+location_id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    })
  .then(response => response.json())
  .then(data => dispatch({
    type: FETCH_RESTAURANTS,
    payload: data.data
  }));
}