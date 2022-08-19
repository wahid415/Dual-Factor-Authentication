import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const changeHandle = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:5000/api/users/register",
        userData,
        config
      );
      navigate("/");
    } catch (error) {
      setError(
        error.response.message ? error.response.message : error.response
      );
      console.log("Error: ", error.response);
    }
  };

  if (error) {
    return (
      <>
        <h2>Error: Something is wrong!</h2>
      </>
    );
  }

  return (
    <>
      <div className="register-page">
        <h1>User Registration</h1>
        <form className="register-form" onSubmit={submitHandler}>
          <div className="input-field form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control input-field"
              placeholder="Enter Username"
              value={userData.username}
              onChange={(e) => changeHandle("username", e.target.value)}
            />
          </div>
          <div className="input-field form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={userData.email}
              onChange={(e) => changeHandle("email", e.target.value)}
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="input-field form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={userData.password}
              onChange={(e) => changeHandle("password", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={(e) => changeHandle("confirmPassword", e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary text-white text-center form-control"
            type="submit"
          >
            Register
          </button>
        </form>
        <Link to="/login">Already Registered?</Link>
      </div>
    </>
  );
};

export default Register;
