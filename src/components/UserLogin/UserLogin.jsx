import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function UserLogin() {
  const [emailID, setEmailID] = useState('');
  const [CreatePassword, setCreatePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailIdChange = (e) => {
    setEmailID(e.target.value);
  };

  const handleCreatePasswordChange = (e) => {
    setCreatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your Express.js route for login
      const response = await axios.post('http://localhost:3001/api/InternationalDonorlogin', {
        emailID,
        CreatePassword,
      });

      // Check if there's an error message in the response
      if (response.data.status === 'error') {
        setErrorMessage(response.data.message); // Set error message from response
      } else {
        // Redirect to the dashboard if login is successful
        window.location.href = '/user-dashboard';
      }
    } catch (error) {
      // Handle login errors
      console.error('Error submitting login form:', error);
      setErrorMessage('Error submitting login form. Please check your credentials.'); // Fallback error message
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
              value={emailID} 
              onChange={handleEmailIdChange} 
              required 
            />
            <label>Enter your Email ID</label>
          </div>
          <div className="input-field">
            <input 
              type="password" 
              value={CreatePassword} 
              onChange={handleCreatePasswordChange} 
              required 
            />
            <label>Enter your Password</label>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          
          {/* Conditionally render the error message */}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          
          <button type="submit">SIGN IN</button>
          <div className="register">
            <p>Don't have an account? <a href="/user-signup" target="_self">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
