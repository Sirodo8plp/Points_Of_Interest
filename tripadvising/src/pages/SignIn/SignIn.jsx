import React, { useEffect, useState, useContext } from "react";
import SignInForm from "./SignInForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../components/Layout/Layout";

const SignIn = () => {
  const [error, setError] = useState("");
  const [isLoginCompleted, setIsLoginCompleted] = useState(false);
  const navigate = useNavigate();
  const Authentication = useContext(AuthenticationContext);

  useEffect(() => {
    if (isLoginCompleted === true) {
      Authentication.setIsAuthenticated(true);
      navigate("/");
    }
  }, [isLoginCompleted]);

  const PerformLogin = async ({ username, password }) => {
    try {
      const data = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });
      if (data.data.token) {
        window.localStorage.setItem("token", data.data.token);
        setIsLoginCompleted(true);
      }
    } catch (error) {
      setError("The credentials were invalid.");
    }
  };

  return <SignInForm PerformLogin={PerformLogin} errorMessage={error} />;
};

export default SignIn;
