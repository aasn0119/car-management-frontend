import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useAuth from "../hooks/useAuth";

const Layout = ({ children }) => {
  const { user } = useAuth();
  console.log("user in layout", user);

  return (
    <div className="flex flex-col min-h-screen">
      {user && <Navbar />}
      <main className="flex-grow p-6 bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
