import { configureStore, combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./store/storeSlices/loginSlice";
import editUserReducer from "./store/storeSlices/editProfileSlice";

const reducer = combineReducers({
  userLogin: loginReducer,
  editUserProfile: editUserReducer,
});

const store = configureStore({
  reducer,
});

export default store;
