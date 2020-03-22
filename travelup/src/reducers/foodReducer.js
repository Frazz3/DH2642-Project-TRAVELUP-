import { FETCH_RESTAURANTS } from "../actions/types";

const intitialState = {
  items: [],
}

export default function foodReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}