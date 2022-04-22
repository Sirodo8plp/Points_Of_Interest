import React, { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";

const SignInForm = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onUsernameChange = (e) => {
    setUserData((oldData) => {
      return { ...oldData, username: e.target.value };
    });
  };

  const onPasswordChange = (e) => {
    setUserData((oldData) => {
      return { ...oldData, password: e.target.value };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.PerformLogin(userData);
  };

  return (
    <form
      className="my-5 mx-auto text-center"
      style={{ width: "max-content" }}
      onSubmit={onFormSubmit}
    >
      <div className="my-3 text-center">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
          onChange={onUsernameChange}
          autoComplete="off"
        />
      </div>
      <div className="mb-3 text-center">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {props.errorMessage && (
        <div className="col-12 alert alert-danger my-3" role="alert">
          <BsXCircleFill className="me-2 mb-1" />
          {props.errorMessage}
        </div>
      )}
    </form>
  );
};

export default SignInForm;
