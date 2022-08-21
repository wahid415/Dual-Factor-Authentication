import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { userDfaVerifyAction } from "../store/actions/userActions";

const Two2fa = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loggedInUser, error, isDfaVerified } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (!loggedInUser && !userInfo) return navigate("/");
    if (loggedInUser && isDfaVerified) return navigate("/dashboard");
  }, [navigate, loggedInUser, userInfo, isDfaVerified]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      return alert("Please enter Otp to login!");
    }

    dispatch(
      userDfaVerifyAction({
        userId: userInfo.user._id,
        dfaValue: otp,
        otpTokenId: userInfo.otpTokenId,
      })
    );
  };

  return (
    <>
      <div className="w-50 m-auto">
        {error && <h3 className="text-danger">{error.message}</h3>}
        <h2>Validate 2F Authentication</h2>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent in mail"
            />
          </div>
          <button type="submit" className="btn btn-primary form-control">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default Two2fa;
