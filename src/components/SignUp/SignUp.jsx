import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function SignUp() {
  const [orgName, setOrgName] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOrgNameChange = (e) => {
    setOrgName(e.target.value);
  };

  const handleUniqueIdChange = (e) => {
    setUniqueId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation for password matching
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    try {
      // Make a POST request to your Express.js route
      const response = await axios.post('http://localhost:3001/api/storeData', {
        orgName,
        uniqueId,
        password,
        confirmPassword,
      });

      if (response.data.status === 'error') {
        setErrorMessage(response.data.message); // Display server-side error message
      } else {
        setSuccessMessage('Registration successful!');
        // Redirect to the login page on success
        setTimeout(() => {
          window.location.href = '/ngo-login';
        }, 1000); // Delay redirection to let the user see the success message
      }

      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="wrapper signup-background">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="input-field">
            <input type="text" value={orgName} onChange={handleOrgNameChange} required />
            <label>Enter Organization Name</label>
          </div>
          <div className="input-field">
            <input type="text" value={uniqueId} onChange={handleUniqueIdChange} required />
            <label>Please Enter Your FCRA ID</label>
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={handlePasswordChange} required />
            <label>Create a password</label>
          </div>
          <div className="input-field">
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            <label>Confirm password</label>
          </div>

          {/* Display error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Display success message */}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <button type="submit">SIGN UP</button>
          <div className="login">
            <p>
              <a href="/ngo-login" target="_self">
                Already have an account? Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
