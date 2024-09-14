import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Login() {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // New state for error message

  const handleUniqueIdChange = (e) => {
    setUniqueId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your Express.js route for login
      const response = await axios.post('http://localhost:3001/api/login', {
        uniqueId,
        password,
      });

      if (response.data.status === 'error') {
        // Set the error message from the server response
        setErrorMessage(response.data.message);
      } else {
        // Redirect to the NGO dashboard if login is successful
        window.location.href = '/ngo-dashboard';
      }
    } catch (error) {
      // Set error message if there's a server or network issue
      console.error('Error submitting login form:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="background-image"></div>
      <div className="wrapper login-background">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input 
              type="text" 
              id="uniqueId" 
              value={uniqueId} 
              onChange={handleUniqueIdChange} 
              required 
            />
            <label htmlFor="uniqueId">Enter your unique ID</label>
          </div>
          <div className="input-field">
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={handlePasswordChange} 
              required 
            />
            <label htmlFor="password">Enter your password</label>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          
          {/* Conditionally render the error message */}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <button type="submit">SIGN IN</button>
          <div className="register">
            <p>Don't have an account? <a href="/ngo-signup" target="_self">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
