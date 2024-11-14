import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../redux/slice";
import axiosInstance from "../api/axiosConfig"; // Your axios instance
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/Toasts";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Login function
  const login = async (email, password) => {
    dispatch(loginRequest()); // Set loading to true
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        showSuccessToast("Login successful"); // Display success toast notification
      }

      // Store token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Dispatch loginSuccess action with the user data
      dispatch(loginSuccess(response.data.user));
      navigate("/home"); // Redirect to the home page after successful login
    } catch (error) {
      console.error(
        "Login failed",
        error.response?.data?.message || error.message
      );
      showErrorToast(error.response?.data?.message || error.message);
      dispatch(loginFailure(error.message)); // Dispatch loginFailure if login fails
    }
  };

  // Logout function
  const logoutUser = () => {
    dispatch(logout()); // Dispatch logout action to reset auth state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page after logout
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
  };
};

export default useAuth;
