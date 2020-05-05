import { FETCH_ACTIVITIES, RESET_ACTIVITIES } from "../actions/types";

const intitialState = {
  items: []
}

export default function activityReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      console.log("fetching activities in reducer")
      return {
        ...state,
        items: action.payload
      };
    case RESET_ACTIVITIES:
      console.log("reset activites before new fetch")
      return{
        items: []
      }


    default:
      return state;
  }
}
