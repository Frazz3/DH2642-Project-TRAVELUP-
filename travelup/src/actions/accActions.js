import { FETCH_ACCOMMODATIONS, RESET_ACCOMMODATIONS } from "./types";
import {ENDPOINT, API_KEY} from "../apiConfig";

export const fetchAcc = (location_id, guests = "2", rooms = "1") => dispatch => {
  // reset the restaurants before fetching new ones, this is so old values are not shown after a new search has been made
  dispatch({ type: RESET_ACCOMMODATIONS });
  fetch(ENDPOINT+"hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&nights=2&location_id="+location_id+"&adults="+guests+"&rooms="+rooms, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    })
  .then(response => response.json())
  .then(data => dispatch({
    type: FETCH_ACCOMMODATIONS,
    payload: data.data
  }));
}
