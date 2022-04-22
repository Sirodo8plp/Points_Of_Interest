import React,{useState} from 'react';
import {BsXCircleFill} from "react-icons/bs";

const RegisterForm = (props) => {
    const [userData,setUserData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const onUsernameChange = (event) => {
        setUserData((oldData) => {
            return {...oldData,username: event.target.value}
        });
    }

    const onPasswordChange = (event) => {
        setUserData((oldData) => {
            return {...oldData,password: event.target.value}
        });
    }

    const onEmailChange = (event) => {
        setUserData((oldData) => {
            return {...oldData,email: event.target.value}
        });
    }
    const onFirstNameChange = (event) => {
        setUserData((oldData) => {
            return {...oldData,firstName: event.target.value}
        });
    }
    const onLastNameChange = (event) => {
        setUserData((oldData) => {
            return {...oldData,lastName: event.target.value}
        });
    }

    const SubmitForm = (event) => {
        event.preventDefault();
        props.onSubmit(userData);
    }

    return <React.Fragment>
    <h3 className="text-center my-3">
      Register now. Don't miss anything ever again.
    </h3>
    <form className="row g-3 my-3 mx-5" onSubmit={SubmitForm}>
      <div className="mb-3 col-md-6">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          aria-describedby="firstName"
          onChange={onFirstNameChange}
        />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          aria-describedby="firstName"
          onChange={onLastNameChange}
        />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={onEmailChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3 col-md-6">
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
      <div className="mb-3 col-md-6">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          onChange={onUsernameChange}
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {props.error && <div className="col-12 alert alert-danger" role="alert">
        <BsXCircleFill className='me-2 mb-1'/>
        {props.error}
      </div>}
    </form>
  </React.Fragment>
}

export default RegisterForm;