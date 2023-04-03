import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './css/navbar.css';

const NavBar = ({ loggedUsername, setLoggedUsername }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
  }, [loggedUsername, setLoggedUsername]);



  const handleLogout = () => {
    // Clear username and sessionID from localStorage on logout
    localStorage.removeItem("username");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("role");
    localStorage.removeItem("expire");
    localStorage.removeItem("start");
    setIsLoggedIn(false);
    setLoggedUsername("");
    navigate("/");
  };

  useEffect(() => {
    const storedStartTime = localStorage.getItem("start");
    if (storedStartTime) {
      const checkExpiration = setInterval(() => {
        const currentTime = Math.floor(new Date().getTime() / 1000);

        const expireTimestamp = parseInt(storedStartTime) + 30 * 60; // expire after 5 mins  

        if (currentTime > expireTimestamp) {
          console.log("logged out. session expired. Current time: ", currentTime, "ExpireTime: ", expireTimestamp)
          handleLogout();
        }
        else {
          // console.log("not yet", currentTime, expireTimestamp)
        }
      }, 1000); // invoke this function every 1 second

      return () => clearInterval(checkExpiration);
    }
  }, [handleLogout]);

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">365 Tutor</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink activeclassname="active" className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeclassname="active" className="nav-link" to="/mylibrary">
            My Library
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeclassname="active" className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/profile">
              {loggedUsername}'s Profile
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/chathistory">
              Chat
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/login">
              Login
            </NavLink>
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