import { createSlice } from "@reduxjs/toolkit";

const editUserProfileSlice = createSlice({
  name: "EditProfile",
  initialState: {
    userProfile: null,
    error: null,
    status: "",
  },
  reducers: {
    userEditProfile(state, action) {
      state.userProfile = action.payload.updatedProfile;
      state.error = null;
    },

    setEditStatus(state, action) {
      state.status = action.payload;
    },

    setEditProfileError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { userEditProfile, setEditStatus, setEditProfileError } =
  editUserProfileSlice.actions;

export default editUserProfileSlice.reducer;
