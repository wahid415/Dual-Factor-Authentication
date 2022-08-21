import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { editUserProfile } from "../store/actions/userActions";

const UserProfile = () => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!loggedInUser) return navigate("/login");
  }, [navigate, loggedInUser]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(editUserProfile({ username, userId: loggedInUser._id }));
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Edit Profile</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="username"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
