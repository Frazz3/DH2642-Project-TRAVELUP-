import { FETCH_ACTIVITIES, RESET_ACTIVITIES, FETCH_ACTIVITIES_ERROR } from "../actions/types";

const intitialState = {
  items: []
}

export default function activityReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        items: action.payload,
        activityError: false
      };
    case RESET_ACTIVITIES:
      return {
        items: [],
        activityError: false
      }
    case FETCH_ACTIVITIES_ERROR:
      return {
        ...state,
        activityError: true
      }

    default:
      return state;
  }
}
