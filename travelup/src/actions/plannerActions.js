import { FETCH_LOCATION, RESET_LOCATION, LOCATION_ERROR } from "./types";
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
.then(data => {
  console.log("data from fetach ", data)
  dispatch({ 
  type: FETCH_LOCATION,
  payload: data.data[0].result_object.location_id,
  locationName: data.data[0].result_object.name,
  locationPhoto: data.data[0].result_object.photo.images.original.url
})})
.catch(err=> {
  console.log('error in location ', err)
  dispatch({ type: LOCATION_ERROR, error: err, name: destination });
})
}

export const resetLocation = () => {
  return ( (dispatch) => {
    dispatch({ type: RESET_LOCATION });
  })
}