import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedInUser: localStorage.getItem("loggedInUser")
      ? JSON.parse(localStorage.getItem("loggedInUser"))
      : null,
    userInfo: null,
    isDfaVerified: false,
    error: null,
    status: "",
  },
  reducers: {
    userLogin(state, action) {
      state.userInfo = action.payload;
      state.loggedInUser = action.payload.user;
      state.error = null;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },

    setLoginError(state, action) {
      state.error = action.payload;
    },

    userVerifyDfa(state, action) {
      state.isDfaVerified = action.payload;
    },
  },
});

export const { userLogin, setStatus, setLoginError, userVerifyDfa } =
  loginSlice.actions;

export default loginSlice.reducer;
