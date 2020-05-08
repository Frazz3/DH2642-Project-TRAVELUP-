import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from "../actions/types";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state, // så att vi inte overwrite något i state
        authError: "Login failed - " + action.err.message // overwrite:ar det som var i authError
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case SIGNOUT_SUCCESS:
      return state;

    case SIGNOUT_ERROR: //vet ej om detta behövs
      return state;

    case SIGNUP_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: "Sign up failed - " + action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
