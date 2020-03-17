export const signIn = (credentials) => {
    console.log(credentials.dispatch)
    console.log('state', credentials.getState)
    console.log(credentials)
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });
    }
}