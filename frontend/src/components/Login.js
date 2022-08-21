import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLoginAction } from "../store/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser, isDfaVerified, userInfo, error, status } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (loggedInUser && isDfaVerified) return navigate("/dashboard");
    if (userInfo || loggedInUser) return navigate("/validate_2fa");
  }, [userInfo, loggedInUser, isDfaVerified, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(userLoginAction({ email, password }));
  };

  if (status === "loading") {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div className="login-page">
        {error && (
          <h3 style={{ color: "red", fontSize: "bold" }}>
            User or password inavlid!
          </h3>
        )}
        <h1 className="login-heading">Login Page</h1>
        <form className="login-form" onSubmit={submitHandler}>
          <div className="input-field form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="input-field form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <button
            className="btn btn-primary text-white text-center form-control"
            type="submit"
          >
            Login
          </button>
        </form>
        <Link to="/register">Not Registered?</Link>
      </div>
    </>
  );
};

export default Login;
