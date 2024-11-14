// src/redux/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Check if there's a saved user in localStorage on app load
const storedUser = localStorage.getItem("user");
const storedAuthStatus = storedUser ? JSON.parse(storedUser) : null;

const initialStateWithUser = storedAuthStatus
  ? {
      user: storedAuthStatus,
      isAuthenticated: true,
      loading: false,
      error: null,
    }
  : initialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateWithUser,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // Store the user object
      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      // Remove the user from localStorage
      localStorage.removeItem("user");
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Export the reducer
export default authSlice.reducer;
