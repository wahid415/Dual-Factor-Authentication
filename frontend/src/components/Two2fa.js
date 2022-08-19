import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Two2fa = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { data, error } = useSelector((state) => state.userLogin);

  console.log(data);
  console.log(error);

  useEffect(() => {
    if (!data) return navigate("/");
  }, [navigate, data]);

  return (
    <div>
      <h2>Validate Two factor Authentication</h2>
      <form className="form-group">
        <div className="form-control">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP sent in mail"
          />
        </div>
      </form>
    </div>
  );
};

export default Two2fa;
