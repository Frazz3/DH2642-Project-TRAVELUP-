import { FETCH_RESTAURANTS, RESET_RESTAURANTS, FETCH_RESTAURANTS_ERROR } from "../actions/types";

const intitialState = {
  items: [],
  item: {}
}

export default function foodReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        items: action.payload,
        foodError: false
      };
    case RESET_RESTAURANTS:
      return {
        items: [],
        item: {},
        foodError: false
      }
    case FETCH_RESTAURANTS_ERROR:
      return {
        ...state,
        foodError: true
      }

    default:
      return state;
  }
}