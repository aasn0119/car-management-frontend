// src/pages/HomePage.js
import React from "react";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Welcome, {user?.username} !</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
