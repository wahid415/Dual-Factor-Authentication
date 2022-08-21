import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./header.css";

const Header = () => {
  const { loggedInUser } = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <Link className="navbar-brand" to="/">
        Technical Test
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/dashboard">
            Dashboard
          </NavLink>

          {!loggedInUser && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {loggedInUser && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/user-profile">
                {loggedInUser.username}
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="#"
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
