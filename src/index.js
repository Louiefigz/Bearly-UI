import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import Home from "views/Home/HomePage.js";
import Dashboard from "views/Dashboard/DashboardPage";

// import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

//Amplify
import { Amplify } from 'aws-amplify';

var hist = createBrowserHistory();


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_COG_REGION,
    userPoolId: process.env.REACT_APP_COG_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_COG_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COG_APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REACT_APP_S3_REGION,
    bucket: process.env.REACT_APP_S3_BUCKET,
    identityPoolId: process.env.REACT_APP_COG_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: process.env.REACT_APP_API_URL,
        region: process.env.REACT_APP_API_REGION
      },
    ]
  }
});

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={Components} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
