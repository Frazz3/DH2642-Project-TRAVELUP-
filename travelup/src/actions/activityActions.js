import { FETCH_ACTIVITIES, RESET_ACTIVITIES, FETCH_ACTIVITIES_ERROR } from "./types";
import { ENDPOINT, API_KEY } from "../apiConfig";

export const fetchActivities = (location_id, activity_subcategory = "0") => dispatch => {
  // reset the restaurants before fetching new ones, this is so old values are not shown after a new search has been made
  dispatch({ type: RESET_ACTIVITIES });
  fetch(ENDPOINT + "attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&limit=30&bookable_first=false&subcategory=" + activity_subcategory + "&location_id=" + location_id, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      if (!data.data || (data.data.length === 0)) {
        dispatch({
          type: FETCH_ACTIVITIES_ERROR
        })
      } else {
        dispatch({
          type: FETCH_ACTIVITIES,
          payload: data.data
        })
      }
    })
    .catch(err => {
      dispatch({
        type: FETCH_ACTIVITIES_ERROR
      })
    });
}
