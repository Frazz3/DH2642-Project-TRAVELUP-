import { FETCH_RESTAURANTS, RESET_RESTAURANTS, FETCH_RESTAURANTS_ERROR } from "../actions/types";

const intitialState = {
  items: [],
  item: {}    // till vad har vi detta?
}

export default function foodReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      console.log("fetching restaurants")
      return {
        ...state,
        items: action.payload,
        foodError: false
      };
    case RESET_RESTAURANTS:
      console.log("reset restaurants before new fetch")
      return{
        items: [],
        item: {},
        foodError: false
      }
    case FETCH_RESTAURANTS_ERROR:
      return{
        ...state,
        foodError: true
      }
   
    default:
      return state;
  }
}