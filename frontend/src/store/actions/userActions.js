import axios from "axios";

import {
  STATUSES,
  setStatus,
  userLogin,
  setLoginError,
} from "../storeSlices/loginSlice";

export const userLoginAction = (userData) => async (dispatch) => {
  dispatch(setStatus(STATUSES.IDLE));

  dispatch(setStatus(STATUSES.LOADING));

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      userData,
      config
    );

    // console.log(data);
    //Dispatch Login
    dispatch(userLogin(data));

    dispatch(setStatus(STATUSES.IDLE));
  } catch (error) {
    console.log(error);
    dispatch(
      setLoginError(
        error.response.message ? error.response.message : error.response.data
      )
    );
    dispatch(setStatus(STATUSES.IDLE));
  }
};
