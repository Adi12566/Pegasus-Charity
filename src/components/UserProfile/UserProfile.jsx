import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UserDashboard/main.css'; // Assuming this is the CSS file from your original file
import './UserProfile.css';

const ProfilePage = () => {
  // Function to generate a random semi-transparent color
  const getRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    return randomColor;
  };
  
const cards = [
    {
        title: 'Connect to MetaMask',
        content: 'Learn how to connect your MetaMask wallet to the application.',
        imageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ylTPleJ1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/igm41b71sewj8a8jdt7e.jpg' // Replace with your actual image URL
    },
    {
        title: 'Add Funds to MetaMask',
        content: 'Discover how to add funds to your MetaMask wallet.',
        imageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ylTPleJ1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/igm41b71sewj8a8jdt7e.jpg' // Replace with your actual image URL
       // Replace with your actual image URL
    },
    {
      title: 'Add Funds to MetaMask',
      content: 'Discover how to add funds to your MetaMask wallet.',
      imageUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--ylTPleJ1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/igm41b71sewj8a8jdt7e.jpg' // Replace with your actual image URL
     // Replace with your actual image URL
  },
    // ... other cards
];
;

return (
  <div className="user-profile-container">
    {cards.map((card, index) => (
      <div key={index} className="user-profile-card" style={{ backgroundColor: getRandomColor(), marginLeft:'0px'}}>
        <img src={card.imageUrl} alt={card.title} />
        <h3>{card.title}</h3>
        <p>{card.content}</p>
      </div>
    ))}
  </div>
);
};

const UserProfile = () => {
  // Any state or effects from the original Dashboard

  return (
    <div className='userdashboard'>
      {/* Sidebar */}
      {/* Main content */}
      <div className="main-content">
        <ProfilePage />
      </div>
    </div>
  );
};
  
export default UserProfile;
