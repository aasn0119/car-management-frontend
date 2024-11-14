import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FiMenu, FiX } from "react-icons/fi"; // Optional: For the hamburger icon

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Optional: Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu when user navigates
  }, [navigate]);

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => handleNavigation("/cars")}
        >
          Car Management
        </h1>

        {/* Desktop Navbar */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/cars" className="hover:underline">
            My Cars
          </Link>
          <Link to="/cars/create" className="hover:underline">
            Create New Car
          </Link>
          {user ? (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiMenu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 bg-blue-600 text-white w-64 h-full shadow-md transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu}>
            <FiX size={24} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6 mt-8">
          <Link
            to="/cars"
            className="text-lg hover:underline"
            onClick={toggleMobileMenu}
          >
            My Cars
          </Link>
          <Link
            to="/cars/create"
            className="text-lg hover:underline"
            onClick={toggleMobileMenu}
          >
            Create New Car
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="text-lg hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg hover:underline"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay effect for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
