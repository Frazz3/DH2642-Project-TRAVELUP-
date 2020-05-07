import { FETCH_ACCOMMODATIONS, RESET_ACCOMMODATIONS, FETCH_ACCOMMODATIONS_ERROR } from "../actions/types";

const intitialState = {
  items: []
}

export default function accReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS:
      console.log("fetching accommodations in reducer")
      return {
        ...state,
        items: action.payload,
        accError: false
      };
    case RESET_ACCOMMODATIONS:
      console.log("reset accommodations before new fetch")
      return{
        items: [],
        accError: false
      }
    case FETCH_ACCOMMODATIONS_ERROR:
      return{
        ...state,
        accError: true
      } 

    default:
      return state;
  }
}
