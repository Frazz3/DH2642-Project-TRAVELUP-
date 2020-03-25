//import SidebarPresentation from "./presentations/sidebarPresentation";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";

import firebase, { fbConfig } from "./config/fbConfig"; // fbConfig är konfigurationen från vårt projekt i firestore

// const initialState = {}; //används ej nu, vet inte vad man ska ha den till (Calle kanske vet?) /Stina

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore }) // för att koppla till firebase och firestore
    ),
<<<<<<< HEAD
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
=======
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
>>>>>>> 164c4eb7a34442d443f6cdfb93cebb682083245b
    reduxFirestore(firebase, fbConfig)
  )
);

export const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export default store;
