import { combineReducers } from "redux";

// Import all reducers
import tripReducer from "./tripReducer";

// Export all reducers combined with pattern
// state: reducer
// Example - the "trip" state is affected by the "tripReducer".
export default combineReducers({
  trip: tripReducer
});
