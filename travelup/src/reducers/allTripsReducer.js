import { GET_USER_TRIPS, GET_TRIPS_ERROR, REMOVE_TRIP, ADD_TRIP, REMOVE_TRIP_ERROR } from "../actions/types";

const allTripsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_TRIPS:
      return action.payload;
    case GET_TRIPS_ERROR:
      return state;
    case REMOVE_TRIP:
      let tripList = state.filter(trip => trip.id !== action.payload)
      return tripList;
    case ADD_TRIP:
      return [state, action.payload];
    case REMOVE_TRIP_ERROR:
      return state;
    default:
      return state;
  }
};

export default allTripsReducer;
