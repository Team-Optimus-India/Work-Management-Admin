import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "pages/home/Home";
import About from "pages/about/About";
import Contact from "pages/contact/Contact";
import Users from "pages/users/Users";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Route path="/" exact render={routeprops => <Home text="Welcome home" {...routeprops} />} />
        <Route path="/about" render={routeprops => <About {...routeprops} />} />
        <Route path="/contact" render={routeprops => <Contact {...routeprops} />} />
        <Route path="/users" render={routeprops => <Users {...routeprops} />} />
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
