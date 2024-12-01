import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Regex for validation
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
  const userNameOrEmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]{3,15}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format

  // Handle username/email input change
  const handleUserNameOrEmailChange = (e) => {
    setUserNameOrEmail(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, userNameOrEmail: '' })); // Clear username/email error
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' })); // Clear password error
  };

  // Handle phone number change
  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: '' })); // Clear phone error
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Validate username/email
    if (!userNameOrEmailRegex.test(userNameOrEmail.trim())) {
      newErrors.userNameOrEmail = 'Enter a valid email or username (3-15 characters).';
    }

    // Validate password
    console.log('Password input value:', password); // Log the current password value
    console.log('Password Regex Test:', passwordRegex.test(password.trim())); // Log if the password passes the regex

    if (!passwordRegex.test(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters, include at least one letter and one number.';
    }

    // Validate phone number
    if (!phone || !phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post('/signup', { userNameOrEmail, password, phone });
        console.log('Response:', response.data);
        setIsSuccess(true);
        setUserNameOrEmail('');
        setPassword('');
        setPhone('');
        setErrors({});
      } catch (error) {
        console.error('Error:', error.response?.data?.msg || error.message);
        setErrors({
          form: error.response?.data?.msg || 'Something went wrong. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // Stop loading if validation fails
    }
  };

  // Autofocus username/email field on mount
  useEffect(() => {
    document.getElementById('userNameOrEmail')?.focus();
  }, []);

  // Autofocus first error field if validation fails
  useEffect(() => {
    if (errors.userNameOrEmail || errors.password || errors.phone) {
      const firstErrorField = errors.userNameOrEmail
        ? 'userNameOrEmail'
        : errors.password
        ? 'password'
        : 'phone';
      document.getElementById(firstErrorField)?.focus();
    }
  }, [errors]);

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Username/Email Field */}
        <div className="form-group">
          <label htmlFor="userNameOrEmail" className="sr-only">User Name or Email</label>
          <input
            id="userNameOrEmail"
            type="text"
            placeholder="User Name or Email"
            value={userNameOrEmail}
            onChange={handleUserNameOrEmailChange}
            disabled={isLoading}
            aria-invalid={!!errors.userNameOrEmail}
            aria-describedby="userNameOrEmail-error"
          />
          {errors.userNameOrEmail && (
            <span id="userNameOrEmail-error" className="error">{errors.userNameOrEmail}</span>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={handlePhoneChange}
            inputProps={{
              id: 'phone',
              name: 'phone',
              required: true,
            }}
            disabled={isLoading}
          />
          {errors.phone && (
            <span id="phone-error" className="error">{errors.phone}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.password && (
            <span id="password-error" className="error">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {/* Success Message */}
      {isSuccess && <p className="success-message">Successfully signed up! You can now <a href="/signin">Sign In</a>.</p>}

      {/* Form-level Errors */}
      {errors.form && <p className="error-message">{errors.form}</p>}

      {/* Redirect to Sign In */}
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default Signup;
