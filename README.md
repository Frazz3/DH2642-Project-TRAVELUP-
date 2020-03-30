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

-what to do next-

## Project file structure
```
travelup
├─src
├──┼─actions - *folder for redux-actions*
```


