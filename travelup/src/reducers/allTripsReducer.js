import { GET_USER_TRIPS, GET_TRIPS_ERROR } from "../actions/types";

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
  console.log("STATE: ", state.allTrips);
  console.log("TYPE: ", action.type);
  console.log("PAYLOAD: ", action.payload);

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
