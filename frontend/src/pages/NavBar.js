import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const NavBar = ({ loggedUsername, setLoggedUsername }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Check if user is logged in by checking if username exists in localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setLoggedUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setLoggedUsername("");
    }
  }, [loggedUsername]);

  const handleLogout = () => {
    // Clear username and sessionID from localStorage on logout
    localStorage.removeItem("username");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setLoggedUsername("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">365 Tutor</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile: {loggedUsername}</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign up</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default NavBar;