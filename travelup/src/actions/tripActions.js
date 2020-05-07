// Samling av alla typer av actions för resor/trips. En typ av action skulle kunna vara att för vår nya resa sätta själva resmålet, t.ex. Stockholm.
// Varje action-funktion är ansvarig för att, baserat på eventuell indata (t.ex. "location"),
// returnera ett action-object, med ett type-attribut (t.ex. SET_LOCATION), och en payload (location i detta fall).
// type-attributet anger alltså TYPEN av action. "payloaden" anger datat vi vill göra nånting med. location är kanske strängen "Stockholm".

import { CREATE_TRIP, CREATE_TRIP_ERROR, RESET_LOCATION, RESET_RESTAURANTS, RESET_TRIP, ADD_RESTAURANT, ADD_ACTIVITY, ADD_ACCOMMODATION, REMOVE_RESTAURANT, REMOVE_ACTIVITY, REMOVE_ACCOMMODATION } from "../actions/types";


export const createTrip = (trip, userID) => {
  console.log("Created trip: ", trip);
  console.log("User: ", userID);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore
      .collection("trips")
      .add({
        ...trip,
        createdAt: new Date()    //ifall vi vill ha när trip:en skapades
      })
      .then(response => {
        console.log("response id", response.id);
        //lägg in trip i användaren som skapat den

        return firestore
          .collection("users")
          .doc(userID)
          .update({
            trips: firebase.firestore.FieldValue.arrayUnion(response.id)
          });
      })
      .then(() => {
        console.log("have created the trip!!");
        dispatch({ type: CREATE_TRIP, trip: trip });

        // reset after the trip is created
        dispatch({ type: RESET_LOCATION });
        dispatch({ type: RESET_TRIP });

      })
      .catch(err => {
        dispatch({ type: CREATE_TRIP_ERROR, err });
      });
  };
};

export const resetTrip = () => {
  return ( (dispatch) => {
    return dispatch({ type: RESET_TRIP });
  })
}

export const addRestaurant = (restaurant) => {
  return ( (dispatch) => {
    dispatch( {type: ADD_RESTAURANT, restaurant: restaurant})
  })

};

export const removeRestaurant = (restaurant) => {
  return ( (dispatch) => {
    dispatch( {type: REMOVE_RESTAURANT, restaurant: restaurant})
  })
}

//Vet inte hur denna ska se ut?
export const addActivity = (activity) => {
  return ( (dispatch) => {
    dispatch( {type: ADD_ACTIVITY, activity: activity})
  })
};


export const removeActivity = (activity) => {
  return ( (dispatch) => {
    dispatch( {type: REMOVE_ACTIVITY, activity: activity})
  })
}

export const addAccommodation = (accommodation) => {
  return ( (dispatch) => {
    dispatch( {type: ADD_ACCOMMODATION, accommodation: accommodation})
  })
};

export const removeAccommodation = (accommodation) => {
  return ( (dispatch) => {
    dispatch( {type: REMOVE_ACCOMMODATION, accommodation: accommodation})
  })
}
