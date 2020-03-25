import { FETCH_LOCATION } from "./types";
import {ENDPOINT, API_KEY} from "../apiConfig";

export const fetchLocation = (destination) => dispatch => { 
  fetch(ENDPOINT+"locations/search?limit=30&sort=relevance&offset=0&lang=en_US&currency=SEK&units=km&query="+destination, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })
.then(response => response.json())
.then(data => dispatch({ 
  type: FETCH_LOCATION,
  payload: data.data[0].result_object.location_id
}));
}