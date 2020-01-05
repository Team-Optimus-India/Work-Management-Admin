import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "pages/home/Home";
import Users from "pages/users/Users";
import Issues from "pages/issues/Issues";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Route
          path="/"
          exact
          render={routeprops => <Home text="Work Measurement Admin Application " {...routeprops} />}
        />
        <Route path="/users" render={routeprops => <Users {...routeprops} />} />
        <Route path="/issues" render={routeprops => <Issues {...routeprops} />} />
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
