import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { BsCheckSquareFill } from "react-icons/bs";

const Register = () => {
  const [error, setError] = useState("");
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);

  const RegisterUser = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }) => {
    if (!username || !password || !firstName || !lastName) {
      setError("All fields are required.");
      return;
    }
    const data = await axios.post("http://localhost:4000/user", {
      username,
      password,
      email,
      name: firstName,
      surname: lastName,
    });
    if (data.data === "User was successfully created.") {
      setIsRegistrationCompleted(true);
    }
  };
  return (
    <React.Fragment>
      {!isRegistrationCompleted && (
        <RegisterForm onSubmit={RegisterUser} error={error} />
      )}
      {isRegistrationCompleted && (
        <div
          className="alert alert-success text-center my-5"
          role="alert"
          style={{ width: "max-content", margin: "0 auto" }}
        >
          Your registration was successfull. You can now sign in and use our
          services.
          <BsCheckSquareFill className="ms-2 mb-1" />
        </div>
      )}
    </React.Fragment>
  );
};

export default Register;
