# TRAVELUP

## DH2642-Project

### Contributors:

* Carl Johan Freme (freme@kth.se)
* Cecilia Mikiver (cmikiver@kth.se)
* Sebastian Franzén (sfranze@kth.se)
* Stina Långström (stinalan@kth.se)

### Deployed app
[TravelUp](https://travelup-2fcd0.web.app/)

## Description of the project
TRAVELUP is a web application with features such as planning an upcoming trip, review your custom trips and view previous trips you have done. The application uses the TripAdvisor API and is developed in React-Redux with connection to Firebase and cloud Firestore. The application requires the user to sign up for an account in order to be able to use it and to create new trips which could be add to your personal trip collection. All you have to do is to specify a city where you are going on a trip, choose whether you want browse through different restaurants, accommodations or activities and thereafter add the desired restaurant/hotel/activity to your custom-made trip. You are able to add as many restaurants/hotels/activities as you like and to filter them by price, ratings etc. in order to match your specific requirements and preferences. We are here to help you plan the best trip you can imagine!

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

From the information of the API call, a user can choose restaurants, accommodations and activities to add to a trip. Once the user is pleased with the content of the trip, the user can create that trip. Then the trip is added to Cloud Firestore and associated with the user that created it.


**Display all trips**

All trips that the user has created is displayed. This is done by fetching all the trips from firestore that is connected to the specified user. The user can edit and delete created trips as well.


**Navigation bar**

A navigation bar at the top of the application. Depending of the state of the application (if a user if authenticated or not) there is a different content of the bar. This enables easy navigator for the user on the page.

## How to set up
1. Clone this repository
2. Make sure you have npm (Node Package Manager) installed on your computer
3. Navigate to the travelup-folder
3. Run ```npm i``` from the terminal to install all neccessary packages
4. Run ```npm start``` from the terminal to start the application

## Project file structure
<pre>
<b>travelup</b>
├─ <b>src</b>
|  |
├──┼─ <b>actions</b> - <i>folder for redux-actions</i>
├──┼──┼─ accActions.js – <i>action to make a fetch from the API to get accommodations</i>
├──┼──┼─ activityActions.js – <i>action to make a fetch from the API to get activities</i>
├──┼──┼─ allTripsActions.js – <i>actions to get all trips of a user from Cloud Firestore</i>
├──┼──┼─ authActions.js – <i>actions to sign up, sign in and sign out for a user</i>
├──┼──┼─ foodActions.js – <i>action to make a fetch from the API to get restaurants</i>
├──┼──┼─ plannerActions.js - <i>actions to make a fetch from the API to get location id from the wanted location or reset the location</i>
├──┼──┼─ tripActions.js – <i>actions to add and remove restaurants, activities and accommodations to/from the trip and a action to add the entire trip to the database. There is also an action to reset the trip</i>
├──┼──┴─ types.js – <i>declaration of types of actions</i>
|  |
├──┼─ <b>assets</b>
├──┼──┴─ style.js - <i>styling for components that cannot be styled in the css</i>
|  |
├──┼─ <b>components</b> - <i>folder for all the visual components of the project, views</i>
├──┼──┼─ AllTrips.js – <i>shows all trips the user has created</i>
├──┼──┼─ BrowseAcc.js – <i>shows all accomodations from API fetch, together with filter options</i>
├──┼──┼─ BrowseActivities.js – <i>shows all activities from API fetch, together with filter options</i>
├──┼──┼─ BrowseFood.js – <i>shows all restaurants from API fetch, together with filter options</i>
├──┼──┼─ LoginForm.js – <i>shows the log-in form</i>
├──┼──┼─ Modal.js – <i>several modals that can be used to display information about a restaurant etc. or pop-up messages for the user</i>
├──┼──┼─ MyTrip.js – <i>displays the current trip. Enables the creation of the trip if the "add trip"-button is clicked and resets the trip is the "discard"-button is clicked</i>
├──┼──┼─ Navbar.js – <i>shows the navigation bar</i>
├──┼──┼─ Planner.js – <i>shows the field to search for a new location</i>
├──┼──┼─ SearchSelection.js – <i>shows the browse possibilities</i>
├──┼──┼─ SignedInLinks.js – <i>shows the links to be displayed when user is sign in</i>
├──┼──┼─ SignedOutLinks.js – <i>shows the links to be displayed when user is signed out</i>
├──┼──┼─ SignupForm.js – <i>shows a form that enables sign up to the application</i>
├──┼──┴─ Start.js – <i>shows the start page of the application</i>
|  |
├──┼─ <b>config</b> - <i>folder for configuration</i>
├──┼──┴─ fbConfig.js – <i>configuration for firebase</i>
|  |
├──┼─ <b>containers</b> - <i>folder for all containers</i>
├──┼──┼─ AllTripsContainer.js - <i>Enables a user to see all its trip. Those are fetched from firebase. The user can also delete a trip or edit it.</i>
├──┼──┼─ BrowseAccContainer.js - <i>Enables a user to browse accommodations from the API</i>
├──┼──┼─ BrowseActivitiesContainer.js - <i>Enables a user to browse activities from the API</i>
├──┼──┼─ BrowseFoodContainer.js - <i>Enables a user to browse restaurants from the API</i>
├──┼──┼─ LoginFormContainer.js - <i>Enables a user to log in to the application and by that get persionalized information on the site</i>
├──┼──┼─ MyTripContainer.js - <i>Enables a user to add things to a trip and save it in a database</i>
├──┼──┼─ PlannerContainer.js - <i>Enables the user to search for locations from the API</i>
├──┼──┼─ SearchSelectionContainer.js - <i>Enables the user to browse on different thing to add to its trip (restaurants, accommodations and activities)</i>
├──┼──┼─ SignupFormContainer.js - <i>Enables the user to create an account to the application</i>
├──┼──┴─ StartContainer.js - <i>The start page of the application where a user can log in or sign up. If user is signed in it redirects to planner.</i>
|  |
├──┼─ <b>reducers</b> - <i>folder for reducers </i>
├──┼──┼─ accReducer.js – <i>reducer for fetching accommodations</i>
├──┼──┼─ activityReducer.js – <i>reducer for fetching activities</i>
├──┼──┼─ allTripsReducer.js – <i>reducer for display of all trips of a user, done by fetching from the database</i>
├──┼──┼─ authReducer.js – <i>reducer for log in, log out and sign up</i>
├──┼──┼─ foodReducer.js – <i>reducer for fetching restaurants</i>
├──┼──┼─ index.js – <i>combine all reducers of the application</i>
├──┼──┼─ plannerReducer.js – <i>reducer to fetch and reset a location</i>
├──┼──┴─ tripReducer.js – <i>reducer to create, edit and reset a trip</i>
|  |
├──┼─App.css – <i>style for the application</i>
├──┼─App.js – <i>the main page of the application. Here is where the routing occurs</i>
├──┼─index.css
└──┴─store.js – <i>the redux store</i>
</pre>
