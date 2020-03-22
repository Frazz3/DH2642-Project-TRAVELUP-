import { FETCH_LOCATION } from "../actions/types";

const intitialState = { 
  items: [], // Inte hundra på detta, vi ska endast hämta en sträng med siffror
  item: {}
}

export default function plannerReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}