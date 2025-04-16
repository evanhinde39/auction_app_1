import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  // Check if the user is logged in based on the presence of the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If the token exists, the user is logged in
    } else {
      setIsAuthenticated(false); // If no token, user is not logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsAuthenticated(false); // Update the state to reflect the user is logged out
    navigate("/login"); // Redirect to login page after logging out (or home page)
  };

  return (
    <div>
      <header className="bg-dark text-white py-2">
        <h2 className="ms-3">auctionpools.ca</h2>
      </header>

      <nav className="bg-danger d-flex justify-content-between w-100">
        {/* Left-side Links */}
        <div className="d-flex">
          <a href="/" className="btn btn-danger mx-2 my-1 text-white hover-expand">
            Home
          </a>
          <a href="/mypoolsdashboard" className="btn btn-danger mx-2 my-1 text-white hover-expand">
            My Pools
          </a>
          <a href="/joinpool" className="btn btn-danger mx-2 my-1 text-white hover-expand">
            Join Pool
          </a>
          <a href="/createpooldashboard" className="btn btn-danger mx-2 my-1 text-white hover-expand">
            Create Pool
          </a>
        </div>

        {/* Right-side Links */}
        <div className="d-flex">
          {/* Conditionally render based on whether the user is authenticated */}
          {!isAuthenticated ? (
            <>
              <a href="/login" className="btn btn-danger mx-2 my-1 text-white hover-expand">
                Login
              </a>
              <a href="/register" className="btn btn-danger mx-2 my-1 text-white hover-expand">
                Register
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-danger mx-2 my-1 text-white hover-expand"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main style={{ padding: "1rem" }}>
        {children} {/* 👈 This is where the page content goes */}
      </main>

      <footer className="d-flex justify-content-center align-items-center p-3">
        <a href="/" className="text-black text-decoration-none mx-3 hover:text-danger">
          Home
        </a>
        <a href="/about" className="text-black text-decoration-none mx-3 hover:text-danger">
          About
        </a>
        <a href="/contact" className="text-black text-decoration-none mx-3 hover:text-danger">
          Contact
        </a>
      </footer>
    </div>
  );
};

export default Layout;
