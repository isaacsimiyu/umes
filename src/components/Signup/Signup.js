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

  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
  const userNameOrEmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]{3,15}$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

 
  const handleUserNameOrEmailChange = (e) => {
    setUserNameOrEmail(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, userNameOrEmail: '' })); 
  };

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' })); 
  };
  const disableCopyPaste = (e) => {
    e.preventDefault();
    alert("Copying and pasting is not allowed for security reasons.");
  }

  
  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: '' })); 
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const validateForm = () => {
    const newErrors = {};

    
    if (!userNameOrEmailRegex.test(userNameOrEmail.trim())) {
      newErrors.userNameOrEmail = 'Enter a valid email or username .';
    }

   
    console.log('Password input value:', password); 
    console.log('Password Regex Test:', passwordRegex.test(password.trim())); 

    if (!passwordRegex.test(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    
    if (!phone || !phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3500/signup',
           { userNameOrEmail, password, phone });
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
      setIsLoading(false); 
    }
  };

 
  useEffect(() => {
    document.getElementById('userNameOrEmail')?.focus();
  }, []);

  
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
    <div className="signup-form">
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        
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
              onCopy={disableCopyPaste}
              onPaste={disableCopyPaste}
              onCut={disableCopyPaste}
              autoComplete="off"
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

        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

     
      {isSuccess && <p className="success-message">Successfully signed up! You can now <a href="/signin">Sign In</a>.</p>}

      
      {errors.form && <p className="error-message">{errors.form}</p>}

      
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    
    </div>
    </div>
  );
};

export default Signup;
