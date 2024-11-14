import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice"; // Import the auth slice reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Include the auth reducer
  },
});

export default store;
