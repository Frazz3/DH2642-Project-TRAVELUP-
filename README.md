# TRAVELUP

## DH2642-Project

### Contributors: 

* Carl Johan Freme (freme@kth.se)
* Cecilia Mikiver (cmikiver@kth.se)
* Sebastian Franzén (sfranze@kth.se)
* Stina Långström (stinalan@kth.se)

-description about the project-

## What we have done

**Firebase**

The application is connected to Firebase and Cloud Firestore. This is used for authentication of the user and creation of trips.


**Authentication**

A user can create an account and log in and out of the application. Once logged in, the content of the application is adapted to the user. This includes the trips that the user has created previously and a possibility to create new personal trips.


**API**

The application is connected to an API of TripAdvisor [link](https://rapidapi.com/apidojo/api/tripadvisor1/details?fbclid=IwAR05QjbZPHZCQecy0d58nhEFwCk_gh7uu8JMXMtuPlHP7gjsxdXLF1kQVAk). From the API we can fetch a location and from that location the application shows restaurants. The user is able to use filters to adapt the fetch from the API to their need as well, currently the filters include the price and meal type.


**Choose a location**

The user can choose a location where a trip should be planned. Once the location is set ,the rest of the trip can be created.


**Create a trip**

From the information of the API call, the user can choose restaurants to add to the trip. Once the user is pleased with the content of the trip, the user can create that trip. Then the trip is added to Cloud Firestore and associated with the user that created it.


**Display all trips**

All trips that the user has created is displayed. This is done by fetching all the trips from firestore that is connected to the specified user.


**Navigation bar**

A navigation bar at the top of the application. Depending of the state of the application (if a user if authenticated or not) there is a different content of the bar. This enables easy navigator for the user on the page.


## Future work

* Implement functionality to add activities and accomodation to your trip
* Improvments of the UI
* Feedback when a trip is created
* Automated log out after a specified time
* ...

## Project file structure
<pre>
<b>travelup</b>
├─ <b>src</b>
|  |
├──┼─ <b>actions</b> - <i>folder for redux-actions</i>
├──┼──┼─ allTripsActions.js – <i>actions to get all trips of a user from Cloud Firestore</i>
├──┼──┼─ authActions.js – <i>actions to sign up, sign in and sign out for a user</i>
├──┼──┼─ foodActions.js – <i>action to make a fetch from the API to get restaurants</i>
├──┼──┼─ plannerActions.js - <i>action to make a fetch from the API to get location id from the wanted location</i>
├──┼──┼─ tripActions.js – <i>actions to add restaurants to the trip and action to add the entire trip the database. When the entire trip is added, the current trip is reset</i> 
├──┼──┴─ types.js – <i>declaration of types of actions</i>
|  |
├──┼─ <b>components</b> - <i>folder for all the components of the project</i>
├──┼──┼─ AllTrips.js – <i>show all trips the user has created</i>
├──┼──┼─ BrowseActivities.js – <i>not implemented yet</i>
├──┼──┼─ BrowseFood.js – <i>shows all the restaurants from the fetch. Enables filtering of restaurants as well</i>
├──┼──┼─ LoginForm.js – <i>a form that enables login to the application</i>
├──┼──┼─ MyTrip.js – <i>displays the current trip. Enables the creation of the trip if a button is clicked</i>
├──┼──┼─ Navbar.js – <i>navigation bar</i>
├──┼──┼─ Planner.js – <i>user can choose a location</i>
├──┼──┼─ SearchSelection.js – <i>enables selection of restaurants, accommodation (not implemented yet) and activities (not implemented yet)</i>
├──┼──┼─ SignedInLinks.js – <i>links to be displayed when user is sign in</i>
├──┼──┼─ SignedOutLinks.js – <i>links to be displayed when user is signed out</i>
├──┼──┼─ SignupForm.js – <i>a form that enables sign up to the application</i>
├──┼──┴─ Start.js – <i>start page of the application. Enables log in or sign up. Users is redirected immediately if already signed in.</i>
|  |
├──┼─ <b>config</b> - <i>folder for configuration</i>
├──┼──┴─ fbConfig.js – <i>configuration for firebase</i>
|  |
├──┼─ <b>reducers</b> - <i>folder for reducers </i>
├──┼──┼─ allTripsReducer.js – <i>reducer for display of all trips of a user</i>
├──┼──┼─ authReducer.js – <i>reducer for log in, log out and sign up</i>
├──┼──┼─ foodReducer.js – <i>reducer for fetching restaurants</i>
├──┼──┼─ index.js – <i>combine all reducers of the application</i>
├──┼──┼─ plannerReducer.js – <i>reducer to fetch and reset a location</i>
├──┼──┴─ tripReducer.js – <i>reducer to create and reset a trip</i>
|  |
├──┼─apiConfig.js - <i>configuration of the API. Includes the API-key</i>
├──┼─App.css – <i>style for the application</i>
├──┼─App.js – <i>the main page of the application. Here is where the routing occurs</i> 
├──┼─index.css 
└──┴─store.js – <i>the redux store</i>
</pre>


