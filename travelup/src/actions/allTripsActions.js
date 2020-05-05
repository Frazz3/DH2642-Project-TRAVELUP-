import { GET_USER_TRIPS, GET_TRIPS_ERROR } from "./types";

// -- ACTIONS --
export const getAllTrips = userID => {
  return function(dispatch, getState, { getFirebase, getFirestore }) {
    return firebaseGetUserTrips(userID, getFirestore)
      .then(trips => {
        dispatch({ type: GET_USER_TRIPS, payload: trips });
      })
      .catch(err => {
        dispatch({ type: GET_TRIPS_ERROR, err });
      });
  };
};

// -- THUNKS --
export const firebaseGetUserTrips = (userID, getFirestore) => {
  // INPUT: DB userID
  // OUTPUT: Promise containing user's trips in DB
  const firestore = getFirestore();

  let userTrips = firestore
    .collection("users") // Ta fram användaren baserat på userID
    .doc(userID)
    .get()
    .then(response => {
      let tripPromises = [];
      let tripIDs = response.data().trips; // Array med användarens alla trip-IDn
      tripIDs.map(tripID => {
        if (tripID === "") {
          console.log("Wrong tripID format.");
        } else {
          tripPromises.push(
            firestore
              .collection("trips")
              .doc(tripID)
              .get()
              .then(tripResponse => {
                let tripObject = tripResponse.data();
                tripObject.id = tripID;
                return tripObject;
              })
          );
        }
      });
      return Promise.all(tripPromises); // Return single promise object upon resolving all trip promises
    });
  return userTrips;
};

// -- LISTENERS --
