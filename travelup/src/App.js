import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";

import LoginForm from "./components/LoginForm.js";
import SignupForm from "./components/SignupForm.js";
import Start from "./components/Start.js";
import Planner from "./components/Planner";
import BrowseFood from "./components/BrowseFood.js";
import BrowseActivities from "./components/BrowseActivities.js";

import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'

import store, {rrfProps} from "./store";

// start är main-page. Den första sidan man kommer till när appen startas
// vi behöver ha en ReactReducFirebaseProvider runt vårt projekt för att koppla till firebase (som jag fattat det, ej säker) /Stina
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <div className="App">
              <main>
                <Switch>
                  <Route
                    path="/logIn"
                    render={props => <LoginForm {...props} />}
                    
                  />
                  <Route path="/signUp"
                  render={props => <SignupForm {...props} />}
                  />
                  <Route path="/" 
                  render={props => <Start {...props} />} 
                  exact
                  />
                  <Route
                    path="/planner"
                    render={props => <Planner {...props} />}
                  />
                  <Route
                    path="/food"
                    render={props => <BrowseFood {...props} />}
                  />
                  <Route
                    path="/activities"
                    render={props => <BrowseActivities {...props} />}
                  />
                </Switch>
              </main>
            </div>
          </ReactReduxFirebaseProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
