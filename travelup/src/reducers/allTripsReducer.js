import { GET_USER_TRIPS, GET_TRIPS_ERROR } from "../actions/types";

const allTripsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_TRIPS:
      return action.payload;
    case GET_TRIPS_ERROR:
      console.log("get trips error ", action.err);
      return state;
    default:
      return state;
  }
};

export default allTripsReducer;
