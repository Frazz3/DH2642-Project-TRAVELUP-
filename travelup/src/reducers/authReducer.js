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
      console.log("login error");
      return {
        ...state, // så att vi inte overwrite något i state
        authError: "Login failed" // overwrite:ar det som var i authError
      };
    case LOGIN_SUCCESS:
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case SIGNOUT_SUCCESS:
      console.log("signout success");
      return state;

    case SIGNOUT_ERROR: //vet ej om detta behövs
      console.log("signout failed");
      return state;

    case SIGNUP_SUCCESS:
      console.log("Signup success");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_ERROR:
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
