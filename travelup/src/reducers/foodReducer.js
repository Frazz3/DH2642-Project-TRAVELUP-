import { FETCH_RESTAURANTS } from "../actions/types";

const intitialState = {
  items: [],
  item: {}
}

export default function foodReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      console.log("fetching restaurants")
      return {
        ...state,
        items: action.payload
      };
   
    default:
      return state;
  }
}