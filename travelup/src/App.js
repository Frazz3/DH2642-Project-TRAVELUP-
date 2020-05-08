import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";

import LoginFormContainer from "./containers/LoginFormContainer";
import SignupFormContainer from "./containers/SignupFormContainer";
import StartContainer from "./containers/StartContainer";
import PlannerContainer from "./containers/PlannerContainer";
import BrowseFoodContainer from "./containers/BrowseFoodContainer";
import BrowseActivitiesContainer from "./containers/BrowseActivitiesContainer";
import BrowseAccContainer from "./containers/BrowseAccContainer";
import AllTripsContainer from "./containers/AllTripsContainer";
import MyTripContainer from "./containers/MyTripContainer";
import SearchSelectionsContainer from "./containers/SearchSelectionsContainer";
import Navbar from "./components/Navbar";

import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";

import store, { rrfProps } from "./store";

// start är main-page. Den första sidan man kommer till när appen startas
// vi behöver ha en ReactReducFirebaseProvider runt vårt projekt för att koppla till firebase (som jag fattat det, ej säker) /Stina
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Navbar />

            <div className="App">
              <div class="container-fluid">
                <div class="row">
                  <div
                    className="mainCont"
                    class="col col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"
                  >
                    <Switch>
                      <Route
                        path="/logIn"
                        render={props => (
                          <LoginFormContainer {...props} className="auth" />
                        )}
                      />
                      <Route
                        path="/signUp"
                        render={props => (
                          <SignupFormContainer {...props} className="auth" />
                        )}
                      />
                      <Route
                        path="/"
                        render={props => <StartContainer {...props} className="auth" />}
                        exact
                      />
                      <Route
                        path="/planner"
                        render={props => <PlannerContainer {...props} />}
                      />
                      <Route
                        path="/food"
                        render={props => <BrowseFoodContainer {...props} />}
                      />
                      <Route
                        path="/activities"
                        render={props => <BrowseActivitiesContainer {...props} />}
                      />
                      <Route
                        path="/accommodations"
                        render={props => <BrowseAccContainer {...props} />}
                      />
                      <Route
                        path="/allTrips"
                        render={props => <AllTripsContainer {...props} />}
                      />
                      <Route
                        path="/select"
                        render={props => (
                          <SearchSelectionsContainer {...props} myTrip={MyTripContainer} />
                        )}
                      />
                    </Switch>
                  </div>
                  <div className="myTrip" class="col col-xl-3 col-lg-3">
                    <MyTripContainer />
                  </div>
                </div>
              </div>
            </div>
          </ReactReduxFirebaseProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
