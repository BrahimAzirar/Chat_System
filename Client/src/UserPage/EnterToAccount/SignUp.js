import axios from "axios";
import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const FirstName = useRef(),
    LastName = useRef(),
    Email = useRef(),
    Thel = useRef(),
    Password = useRef(),
    ResetPassword = useRef();

	const redirect = useNavigate();

  function CreateAccount(e) {
    e.preventDefault();
    try {
		const data = {
			FirstName: FirstName.current.value,
			LastName: LastName.current.value,
			Email: Email.current.value,
			Thel: Thel.current.value,
			Password: Password.current.value,
		  };
  
		  axios
			.post("http://localhost:8000/api/register", data)
			.then(res => redirect(res.data.response));
	} catch (err) {
		alert(err.message);
	};
  }

  return (
    <div className="Parent">
      <div className="w-75 border FormStyle py-4 px-5">
        <h2 className="text-center mb-3">CS | Chat System</h2>
        <form className="row justify-content-center">
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="firstName"
              className="col-sm-5 col-md-12 col-form-label"
            >
              First Name
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="text"
                ref={FirstName}
                className="form-control SelfStyle"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>
          </div>
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="lastName"
              className="col-sm-3 col-md-12 col-form-label mb-2"
            >
              Last Name
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="text"
                ref={LastName}
                className="form-control SelfStyle"
                id="lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="email"
              className="col-sm-3 col-md-12 col-form-label mb-2"
            >
              Email
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="email"
                ref={Email}
                className="form-control SelfStyle"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="phone"
              className="col-sm-3 col-md-12 col-form-label mb-2"
            >
              Phone Number
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="tel"
                ref={Thel}
                className="form-control SelfStyle"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="password"
              className="col-sm-3 col-md-12 col-form-label mb-2"
            >
              Password
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="password"
                ref={Password}
                className="form-control SelfStyle"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="row mb-3 col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label
              htmlFor="resetPassword"
              className="col-sm-3 col-md-12 col-form-label mb-2"
            >
              Reset Password
            </label>
            <div className="col-sm-9 col-md-11">
              <input
                type="password"
                ref={ResetPassword}
                className="form-control SelfStyle"
                id="resetPassword"
                placeholder="Re-enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={CreateAccount}
            className="btn btn-primary w-50 m-auto SelfStyle"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Are you have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}
