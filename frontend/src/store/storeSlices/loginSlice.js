import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    error: null,
    status: "",
  },
  reducers: {
    userLogin(state, action) {
      state.data = action.payload;
      state.error = null;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },

    setLoginError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { userLogin, setStatus, setLoginError } = loginSlice.actions;

export default loginSlice.reducer;
