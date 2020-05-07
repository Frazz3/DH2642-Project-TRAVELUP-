import { GET_USER_TRIPS, GET_TRIPS_ERROR, REMOVE_TRIP, REMOVE_TRIP_ERROR } from "../actions/types";

// const initState = {
//   allTrips: [
//     {
//       id: "12345",
//       country: "Sweden",
//       city: "Stockholm",
//       author: "Stina",
//       restaurants: [
//         {
//           id: "1",
//           name: "Max",
//           price: "100 sek",
//           description: "Hamburger restaurant"
//         }
//       ]
//     }
//   ]
// };

const allTripsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_TRIPS:
      return action.payload;
    case GET_TRIPS_ERROR:
      console.log("get trips error ", action.err);
      return state;
    case REMOVE_TRIP:
      console.log("remove trip, id: ", action.payload)
      let tripList = state.filter( trip => trip.id !== action.payload)
      console.log('triplist :', tripList)
      return tripList;
      
    case REMOVE_TRIP_ERROR:
      console.log("removetrip error ", action.err);
      return state;
    default:
      return state;
  }
};

export default allTripsReducer;
