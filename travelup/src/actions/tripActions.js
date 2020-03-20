// Samling av alla typer av actions för resor/trips. En typ av action skulle kunna vara att för vår nya resa sätta själva resmålet, t.ex. Stockholm.
// Varje action-funktion är ansvarig för att, baserat på eventuell indata (t.ex. "location"),
// returnera ett action-object, med ett type-attribut (t.ex. SET_LOCATION), och en payload (location i detta fall).
// type-attributet anger alltså TYPEN av action. "payloaden" anger datat vi vill göra nånting med. location är kanske strängen "Stockholm".

/*
export const setTripLocation = location => {
  return {
    type: SET_LOCATION,
    location: location
  };
};
*/

export const createTrip = (trip, userID) => {
  console.log('the created trip', trip)
  console.log('user', userID)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore.collection('trips').add({
      ...trip
      //lägg in author senare (baserat på den som är inloggad dvs.)
      // createdAt: new Date()    ifall vi vill ha när trip:en skapades
    }).then((response) => {
      console.log('response id', response.id);
      //lägg in trip i användaren som skapat den
      
      return firestore.collection('users').doc(userID).update({
        trips: firebase.firestore.FieldValue.arrayUnion(response.id)
      })
    }).then(() => {
      console.log("have created the trip!!")
      dispatch({type: 'CREATE_TRIP', trip: trip});
    }).catch((err) => {
      dispatch({ type: 'CREATE_TRIP_ERROR', err});
    })
    //ska lägg till så att ID:et som skapas när vi lägger till trip:en ska läggas in i listan för användaren som skapat trip:en

    
  }
};


