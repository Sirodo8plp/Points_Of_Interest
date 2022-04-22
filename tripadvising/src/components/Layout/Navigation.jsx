import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "./Layout";

const Navigation = () => {
  const Authentication = useContext(AuthenticationContext);
  const [isSigned, setIsSigned] = useState(false);
  useEffect(() => {
    if (
      Authentication.isAuthenticated === true ||
      window.localStorage.getItem("token")
    ) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  }, [Authentication.isAuthenticated]);

  const SignOut = () => {
    window.localStorage.removeItem("token");
    Authentication.setIsAuthenticated(false);
    // setIsSigned(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Tripadvising
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-5 mx-sm-0">
              <Link to="/places" className="nav-link">
                Places
              </Link>
            </li>
            {!isSigned && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isSigned === true && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    View Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={SignOut}>
                    Sign Out
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
