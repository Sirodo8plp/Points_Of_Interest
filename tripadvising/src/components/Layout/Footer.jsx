import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="#">
            Places
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="#">
            Sign
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="#">
            Register
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">© 2021 Tripadvising, Inc</p>
    </footer>
  );
};

export default Footer;
