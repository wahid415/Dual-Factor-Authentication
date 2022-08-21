import axios from "axios";

import {
  STATUSES,
  setStatus,
  userLogin,
  userVerifyDfa,
  setLoginError,
} from "../storeSlices/loginSlice";

import {
  setEditStatus,
  setEditProfileError,
  userEditProfile,
} from "../storeSlices/editProfileSlice";

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

    localStorage.setItem("loggedInUser", JSON.stringify(data.user));

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

//DFA verification Action
export const userDfaVerifyAction = (dfaData) => async (dispatch) => {
  dispatch(setStatus(STATUSES.IDLE));

  dispatch(setStatus(STATUSES.LOADING));

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      "http://localhost:5000/api/users/login/validate_2fa",
      dfaData,
      config
    );

    //Dispatch Login
    dispatch(userVerifyDfa(true));

    dispatch(setStatus(STATUSES.IDLE));
  } catch (error) {
    console.log(error);
    dispatch(
      setLoginError(error.response.data ? error.response.data : error.response)
    );
    dispatch(setStatus(STATUSES.IDLE));
  }
};

//Edit Profile
export const editUserProfile = (editData) => async (dispatch) => {
  dispatch(setEditStatus(STATUSES.IDLE));

  dispatch(setStatus(STATUSES.LOADING));

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users/edit-profile",
      editData,
      config
    );

    dispatch(userEditProfile(data));

    localStorage.setItem("loggedInUser", data.updatedProfile);

    dispatch(setStatus(STATUSES.IDLE));
  } catch (error) {
    console.log(error);
    dispatch(
      setEditProfileError(
        error.response.message ? error.response.message : error.response.data
      )
    );
    dispatch(setStatus(STATUSES.IDLE));
  }
};
