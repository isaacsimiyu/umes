import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing reset token.');
      navigate('/reset-password');
    }
  }, [token, navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one letter and one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    axios.post('http://localhost:3500/reset-passwordd', 
       { password })
      .then(() => {
        setMessage('Password reset successfully. You can now log in.');
        navigate('/signin');
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || 'Failed to reset password. Please try again.';
        setMessage(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={isLoading}
            />
            <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
