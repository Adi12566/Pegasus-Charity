import React from 'react';

const paymentGateway = () => {
  const containerStyle = {
    backgroundImage: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
    color: '#fff',
    margin: '150px auto',
    textAlign: 'center',
    width: '100%',
    padding: '50px',  // Added padding for better visibility
  };

  const headingStyle = {
    fontSize: '50px',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'capitalize',
    letterSpacing: '1px',
    marginTop: '20px',  // Adjusted margin for better visibility
    marginBottom: '20px',
  };

  const btnStyle = {
    padding: '15px 50px',  // Adjusted padding for better visibility
    margin: '20px 10px',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '5px',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={headingStyle}>
          Web Development & Designing Internship <br /> @ The Sparks Foundation
        </h2>
        <a href="/gateway" style={btnStyle}>
          DONATE
        </a>
      </div>
    </div>
  );
}

export default paymentGateway;
