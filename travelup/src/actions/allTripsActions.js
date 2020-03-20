
export const getAllTrips = (userID) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('in the action')
        const firestore = getFirestore();
        
        // hämta trips-listan för användaren
        firestore.collection('users').doc(userID).get().then((response) => {
            const allTrips = response.data().trips;
            // hämtar all information om varje trip
            // vill lägga alla nya objekt i samma lista och lägga in den i allTrips-state:et, vet ej hur...
            allTrips.map( (trip) => {
                console.log('trip', trip)
                if (trip===''){
                    console.log('wrong format')
                }else{
                firestore.collection('trips').doc(trip).get().then((t) => {
                    console.log('a trip', t.data())
                    // dispatch({type: 'ADD_ONE_TRIP_TO_ALL_TRIPS', trip: t.data()})
                })}
            })

            console.log('response', response.data().trips)
        }).catch((err) => {
            dispatch({type: 'GET_TRIPS_ERROR', err});
        })
    }

}