const initState = {
    trips: [
        {country:'Sweden', city:'Stockholm', author:'Stina', restaurants: [{id:'1', name:'Max', price:'100 sek', description:'Hamburger restaurant'}]}
    ]
}

const allTripsReducer = (state = initState, action) => {
    return state;
}
export default allTripsReducer;