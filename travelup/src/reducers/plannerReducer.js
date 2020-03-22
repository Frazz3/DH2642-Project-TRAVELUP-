import { FETCH_LOCATION } from "../actions/types";

const intitialState = { 
  id: '123' // Inte hundra på detta, vi ska endast hämta en sträng med siffror
  
}

export default function plannerReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        //...state,
        id: action.payload // id som fetchen returnerar
      };
    default:
      return state;
  }
}