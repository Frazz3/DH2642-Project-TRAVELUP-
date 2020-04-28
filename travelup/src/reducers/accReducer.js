import { FETCH_ACCOMMODATIONS, RESET_ACCOMMODATIONS } from "../actions/types";

const intitialState = {
  items: []
}

export default function accReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS:
      console.log("fetching accommodations in reducer")
      return {
        ...state,
        items: action.payload
      };
    case RESET_ACCOMMODATIONS:
      console.log("reset accommodations before new fetch")
      return{
        items: []
      }


    default:
      return state;
  }
}
