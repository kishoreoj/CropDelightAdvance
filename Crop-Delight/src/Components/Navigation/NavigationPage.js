import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth  } from '../../context/AuthContext'; // Adjust path as needed
import Icon from '../../Images/logo.png'; // Make sure to update the path to your icon
import './NavigationPage.css'; // Create and import a CSS file for your Navbar

const Navigation = () => {
  const { user, logout } = useAuth();;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate('/home');
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearTimeout(timer);
  }, [navigate, logout]);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/home" className="nav-link">
            <img src={Icon} alt="Crop Delight Logo" className="logo" />
          </Link>
        </div>
        <div className="navbar-right">
          <ul>
            <li><Link to="/home">Home</Link></li>
            {user && (
              <>
                <li><Link to={`/${user.userType}`}>{user.userType} Dashboard</Link></li>
                {user.userType === 'Customer' && (
                  <>
                    <li><Link to="/Cust-products">Your Products</Link></li>
                    <li><Link to="/orders-summary">Order Summary</Link></li>
                  </>
                )}
                <li><span>Welcome, {user.username}</span></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="navbar-style-bar"></div>
    </div>
  );
};

export default Navigation;
