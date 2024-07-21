import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../../Images/logo.png'; // Make sure to update the path to your icon
import './NavigationPage.css'; // Create and import a CSS file for your Navbar

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink to="/home" className="nav-link">
            <img src={Icon} alt="Crop Delight Logo" className="logo" />
          </NavLink>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              {!location.pathname.includes('/add-product') && (
                <NavLink to="/add-product" className="nav-link">
                  Add Product
                </NavLink>
              )}
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/" className="nav-link">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <div className="navbar-style-bar"></div>
    </div>
  );
};

export default Navbar;
