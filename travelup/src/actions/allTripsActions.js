import { GET_USER_TRIPS, GET_TRIPS_ERROR, REMOVE_TRIP, REMOVE_TRIP_ERROR } from "./types";

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
  console.log("Getting trips from DB with uID: ", userID);

  let userTrips = firestore
    .collection("users") // Ta fram användaren baserat på userID
    .doc(userID)
    .get()
    .then(response => {
      let tripPromises = [];
      let tripIDs = response.data().trips; // Array med användarens alla trip-IDn
      tripIDs.map(tripID => {
        if (tripID === "") {
          console.log("Wrong format.");
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


export const deleteTrip = (tripID, userID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore
      .collection("trips")
      .doc(tripID)
      .delete()
      .then(response => {
        return firestore
        .collection("users")
        .doc(userID)
        .update({
          trips: firebase.firestore.FieldValue.arrayRemove(tripID)   // remove the trip from the array of the user
        });
      })
      .then(() => {
        dispatch({ type: REMOVE_TRIP})
      })
      .catch( err => {
        dispatch({ type: REMOVE_TRIP_ERROR, err})
      });
  };
};

// -- LISTENERS --
