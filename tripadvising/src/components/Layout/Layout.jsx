import React, { createContext, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export const AuthenticationContext = createContext(null);

export const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <React.Fragment>
      <AuthenticationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <Navigation />
        <div id="notificationsContainer"></div>
        <Outlet />
        <Footer />
      </AuthenticationContext.Provider>
    </React.Fragment>
  );
};
