import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

function UserSignUp() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [Name, setName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [Address, setAddress] = useState('');
  const [PanNo, setPanNo] = useState('');
  const [walletid, setWalletid] = useState('');
  const [Passport, setPassport] = useState('');
  const [CreatePassword, setCreatePassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const [isDomestic, setIsDomestic] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailIdChange = (e) => setEmailID(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePanNoChange = (e) => setPanNo(e.target.value);
  const handleWalletidChange = (e) => setWalletid(e.target.value);
  const handlePassportChange = (e) => setPassport(e.target.value);
  const handleCreatePasswordChange = (e) => setCreatePassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (newAccounts) => {
            setAccount(newAccounts[0]);
          });
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not found. Install or enable it.');
      }
    };
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (CreatePassword !== ConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const formData = isDomestic
      ? { Name, emailID, Address, PanNo, walletid, CreatePassword, ConfirmPassword }
      : { Name, emailID, Address, Passport, walletid, CreatePassword, ConfirmPassword };

    const url = isDomestic
      ? 'http://localhost:3001/api/storeData/Domesticdonor'
      : 'http://localhost:3001/api/storeData/Internationaldonor';

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      window.location.href = '/user-login';
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again later.');
    }
  };

  const toggleSignUpMode = () => {
    setIsDomestic(!isDomestic);
    setErrorMessage(''); // Reset error message when switching modes
  };

  return (
    <div className="signup-wrapper">
      <br />
      <CSSTransition
        in={isDomestic}
        timeout={300}
        classNames="sign-up-transition"
        unmountOnExit
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Domestic Sign Up</h2>
            <div className="input-field">
              <input type="text" id="Name" value={Name} onChange={handleNameChange} required />
              <label htmlFor="Name">Enter Name</label>
            </div>
            <div className="input-field">
              <input type="email" id="emailID" value={emailID} onChange={handleEmailIdChange} required />
              <label htmlFor="emailID">Enter Email ID</label>
            </div>
            <div className="input-field">
              <input type="text" id="Address" value={Address} onChange={handleAddressChange} required />
              <label htmlFor="Address">Enter Address</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="PanNo"
                value={PanNo}
                onChange={handlePanNoChange}
                pattern="[A-Za-z0-9]{10}"
                maxLength="10"
                required
              />
              <label htmlFor="PanNo">Enter Pan No</label>
            </div>
            <div className="input-field">
              <input type="text" id="walletid" value={walletid} onChange={handleWalletidChange} required />
              <label htmlFor="walletid">Enter Wallet ID</label>
            </div>
            <div className="input-field">
              <input type="password" id="Password" value={CreatePassword} onChange={handleCreatePasswordChange} required />
              <label htmlFor="Password">Create Password</label>
            </div>
            <div className="input-field">
              <input type="password" id="ConfirmPassword" value={ConfirmPassword} onChange={handleConfirmPasswordChange} required />
              <label htmlFor="ConfirmPassword">Confirm Password</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">SIGN UP</button>
          </form>
          <p>
            <a href="/user-login" target="black">Already have an account? Login</a>
          </p>
          <br />
          <button onClick={toggleSignUpMode}>Switch to International</button>
        </div>
      </CSSTransition>

      <CSSTransition
        in={!isDomestic}
        timeout={300}
        classNames="sign-up-transition"
        unmountOnExit
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>International Sign Up</h2>
            <div className="input-field">
              <input type="text" id="Name" value={Name} onChange={handleNameChange} required />
              <label htmlFor="Name">Enter Name</label>
            </div>
            <div className="input-field">
              <input type="email" id="emailID" value={emailID} onChange={handleEmailIdChange} required />
              <label htmlFor="emailID">Enter Email ID</label>
            </div>
            <div className="input-field">
              <input type="text" id="Address" value={Address} onChange={handleAddressChange} required />
              <label htmlFor="Address">Enter Address</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                id="Passport"
                value={Passport}
                onChange={handlePassportChange}
                pattern="[A-Za-z0-9]{10}"
                maxLength="10"
                required
              />
              <label htmlFor="Passport">Enter Passport No</label>
            </div>
            <div className="input-field">
              <input type="text" id="walletid" value={walletid} onChange={handleWalletidChange} required />
              <label htmlFor="walletid">Enter Wallet ID</label>
            </div>
            <div className="input-field">
              <input type="password" id="CreatePassword" value={CreatePassword} onChange={handleCreatePasswordChange} required />
              <label htmlFor="CreatePassword">Create Password</label>
            </div>
            <div className="input-field">
              <input type="password" id="ConfirmPassword" value={ConfirmPassword} onChange={handleConfirmPasswordChange} required />
              <label htmlFor="ConfirmPassword">Confirm Password</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">SIGN UP</button>
          </form>
          <br />
          <button onClick={toggleSignUpMode}>Switch to Domestic</button>
        </div>
      </CSSTransition>
    </div>
  );
}

export default UserSignUp;
