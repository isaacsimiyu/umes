/* global FB */

import React, { useState, useEffect } from 'react';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: 'YOUR_FACEBOOK_APP_ID',
          cookie: true,
          xfbml: true,
          version: 'v12.0',
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFacebookSDK();
  }, []);

  const handleUserNameOrEmailChange = (e) => {
    setUserNameOrEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, userNameOrEmail: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

    if (!userNameOrEmail) {
      newErrors.userNameOrEmail = 'User Name or Email is required';
    } else if (!emailRegex.test(userNameOrEmail)) {
      newErrors.userNameOrEmail = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one letter and one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post('/signin', { userNameOrEmail, password });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } catch (error) {
        setErrors({
          ...errors,
          form: error.response?.data?.msg || 'Sign In failed. Please try again.',
        });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    setIsGoogleLoading(true);
    try {
      const res = await axios.post('/google-signin', { token: response.credential });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ ...errors, form: 'Google Sign-In failed. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    setErrors({ ...errors, form: 'Google Sign-In failed. Please try again.' });
    setIsGoogleLoading(false);
  };

  const handleFacebookLogin = () => {
    setIsFacebookLoading(true);
    FB.login(async (response) => {
      if (response.authResponse) {
        const { accessToken, userID } = response.authResponse;
        try {
          const res = await axios.post('/facebook-signin', { accessToken, userID });
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        } catch (error) {
          setErrors({ ...errors, form: 'Facebook Sign-In failed. Please try again.' });
        }
      } else {
        setErrors({ ...errors, form: 'Facebook Sign-In failed. Please try again.' });
      }
      setIsFacebookLoading(false);
    }, { scope: 'email' });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="userNameOrEmail">User Name or Email</label>
          <input
            type="text"
            placeholder="User Name or Email"
            value={userNameOrEmail}
            onChange={handleUserNameOrEmailChange}
            disabled={isLoading}
            aria-invalid={!!errors.userNameOrEmail}
            aria-describedby="userNameOrEmail-error"
          />
          {errors.userNameOrEmail && <span id="userNameOrEmail-error" className="error">{errors.userNameOrEmail}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
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
          {errors.password && <span id="password-error" className="error">{errors.password}</span>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="additional-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/reset-password">Reset Password!</Link>
        </div>
      </form>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          buttonText={isGoogleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
        />
      </GoogleOAuthProvider>
      <button onClick={handleFacebookLogin} disabled={isFacebookLoading}>
        {isFacebookLoading ? 'Signing in with Facebook...' : 'Sign in with Facebook'}
      </button>
      {errors.form && <p className="error-message">{errors.form}</p>}
    </div>
  );
};

export default SignIn;
