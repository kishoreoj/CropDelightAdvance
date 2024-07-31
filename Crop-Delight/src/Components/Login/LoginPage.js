import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import './LoginPage.css';
import Navigation from '../Navigation/NavigationPage';
import Footer from '../Footer/FooterPage';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const responseData = await response.json();
        const { userType } = responseData;
        login({ username, userType }); // Set username and userType

        if (userType === 'Farmer') {
          navigate('/Farmer');
        } else if (userType === 'Customer') {
          navigate('/Customer');
        } else if (userType === 'Worker') {
          navigate('/Worker');
        } else {
          navigate('/home');
        }
      } else {
        const errorData = await response.json();
        setError('Login failed: ' + errorData.message);
      }
    } catch (error) {
      setError('Error during login: ' + error.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>New user? <Link to="/register">Register here</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
