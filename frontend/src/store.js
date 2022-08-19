import { configureStore, combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./store/storeSlices/loginSlice";

const reducer = combineReducers({
  userLogin: loginReducer,
});

const store = configureStore({
  reducer,
});

export default store;
