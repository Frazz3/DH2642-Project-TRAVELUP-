import { FETCH_ACCOMMODATIONS, RESET_ACCOMMODATIONS, FETCH_ACCOMMODATIONS_ERROR } from "./types";
import { ENDPOINT, API_KEY } from "../apiConfig";

export const fetchAcc = (location_id, amenities = "all") => dispatch => {
  // reset the restaurants before fetching new ones, this is so old values are not shown after a new search has been made
  dispatch({ type: RESET_ACCOMMODATIONS });
  fetch(ENDPOINT + "hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&nights=2&location_id=" + location_id + "&amenities=" + amenities, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data.data || (data.data.length === 0)) { // if there is no data in the fetch
        dispatch({
          type: FETCH_ACCOMMODATIONS_ERROR
        })
      } else {
        dispatch({
          type: FETCH_ACCOMMODATIONS,
          payload: data.data
        })
      }
    })
    .catch(err => {
      dispatch({
        type: FETCH_ACCOMMODATIONS_ERROR
      })
    });
}
