import { FETCH_LOCATION, RESET_LOCATION, EDIT_LOCATION } from "../actions/types";

const intitialState = { 
  id: null // Inte hundra på detta, vi ska endast hämta en sträng med siffror
  
}

export default function plannerReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        id: action.payload, // id som fetchen returnerar
        name: action.locationName,   // location som användaren söker på
        locationPhoto: action.locationPhoto,
      };
    
    case RESET_LOCATION:  // reset the location
      console.log("reset the location");
      return {
        id: null,
        name: null,
        locationPhoto: null,
      }

    case EDIT_LOCATION:
      console.log("edit location")
      return {
        id: action.id,
        name: action.name,
        locationPhoto: action.photo,
      }
      
    default:
      return state;
  }
}