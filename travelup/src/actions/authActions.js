// alla actions för authentication. Dessa är för att logga in, logga ut samt registrera ny användare

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
       
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then( ()=> {
            dispatch({type: 'SIGNOUT_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNOUT_ERROR', err})
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        // create a new user in firebase
        // doc(response.user.uid) kommer ge oss id från användaren i authentication, dvs. vi kommmer skapa en användare i databasen med samma id som i authentication (annars blir id random, vilket vi inte vill)
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            //skapar en ny users i databasen, här kan vi lägga in vilken information vi vill (tror jag)
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err=> {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
}