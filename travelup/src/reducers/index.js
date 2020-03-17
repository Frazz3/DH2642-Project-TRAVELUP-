import { combineReducers } from "redux";

// Import all reducers
import tripReducer from "./tripReducer";
import authReducer from "./authReducer";

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// Export all reducers combined with pattern
// state: reducer
// Example - the "trip" state is affected by the "tripReducer".
export default combineReducers({
  trip: tripReducer,
  auth: authReducer,
  // npm install react-redux-firebase redux-firestore
  firestore: firestoreReducer,  //will sync our firestore data with the store state
  firebase: firebaseReducer
});
