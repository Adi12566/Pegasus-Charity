import React, { useState } from 'react';
import './style.css';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const feedbackData = {
        name,
        email,
        message,
      };

      // Simulating feedback submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Feedback sent
      setFeedbackSent(true);
      setError(null);

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      setError('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0', backgroundColor: '#f4f4f4' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FABC3F', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h2 style={{ margin: '0', fontSize: '2rem' }}>Pegasus Charity</h2>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        {/* Feedback Form */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '30px', marginBottom: '40px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '10px', color: '#333' }}>We Value Your Feedback</h1>
          <p style={{ textAlign: 'center', fontSize: '1rem', color: '#666', marginBottom: '30px' }}>
            Your thoughts help us improve. Share your ideas, questions, or concerns!
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="name" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="message" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Enter your message"
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  height: '150px',
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                padding: '15px',
                backgroundColor: '#E85C0D',
                color: 'white',
                fontSize: '1.1rem',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#6439FF')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#6439FF')}
            >
              Submit Feedback
            </button>
          </form>

          {/* Display feedback submission status */}
          {feedbackSent && <p style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>Thank you for your feedback!</p>}
          {error && <p style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>{error}</p>}
        </div>

        {/* Contact Us */}
        <div style={{ backgroundColor: '#E85C0D', padding: '40px 20px', borderRadius: '8px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Contact Us</h2>
          <p style={{ marginBottom: '20px' }}>Have questions or want to collaborate? Let’s work together to achieve great things.</p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4' }}>
          <footer>
            <p style={{ color: '#777', margin: '0' }}>&copy; 2023 Pegasus Foundation. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
