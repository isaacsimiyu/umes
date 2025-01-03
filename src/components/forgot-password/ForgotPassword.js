import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3500/forgot-password', { email })

      .then((response) => {
        setMessage('A password reset link has been sent to your email.');
        setEmail('');
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || 'Failed to send password reset link. Please try again.';
        setMessage(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email" aria-label="Email Address">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
