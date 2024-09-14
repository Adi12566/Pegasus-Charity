import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css'; // Assuming this is the CSS file from your original file

const ProfilePage = () => {
  // ProfilePage content as previously defined
  const cards = [
    {
      title: 'Connect to MetaMask',
      content: 'Learn how to connect your MetaMask wallet to the application.'
    },
    {
      title: 'Add Funds to MetaMask',
      content: 'Discover how to add funds to your MetaMask wallet for transactions.'
    },
    {
      title: 'Secure Your Wallet',
      content: 'Understand the best practices for securing your MetaMask wallet.'
    },
    // Additional cards can be added here
  ];

  return (
    <div className="profile-page">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  // Any state or effects from the original Dashboard

  return (
    <div className="ngodashboard">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo and other details from the original file */}
        <div className="logo_details">
          <i className='bx bx-code-alt'></i>
          <div className="logo_name">Pegasus Charity</div>
        </div>
        <ul>
          {/* Other menu items from the original file */}
          <li>
            <a href="/dashboard" className="active">
              <i className='bx bx-grid-alt'></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-user'></i>
              <span className="links_name">Profile</span>
            </a>
          </li>
          {/* Additional menu items can be added here */}
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <ProfilePage />
      </div>
    </div>
  );
};

export default Profile;
