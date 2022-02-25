import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import Profile from "./Profile.js";
import TopBar from "./layout/TopBar";
import SearchIndex from "./SearchIndex.js";
import MovieShow from "./MovieShow.js";
import Homepage from "./Homepage.js";
import TopMoviesShow from "./TopMoviesShow.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <Homepage user={currentUser}/>
        </Route>
        <Route exact path="/top-250" component={TopMoviesShow}></Route>
        <AuthenticatedRoute exact path="/movies/:id" component={MovieShow} user={currentUser} />
        <Route exact path="/search" component={SearchIndex} />
        <AuthenticatedRoute exact path="/profile" component={Profile} user={currentUser} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
