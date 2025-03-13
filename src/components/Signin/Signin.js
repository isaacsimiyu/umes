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
  const navigate = useNavigate();

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
          cookie: true,
          xfbml: true,
          version: 'v12.0',
        });
      };

      (function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFacebookSDK();
  }, []);

  const validateInput = (userNameOrEmail, password) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!userNameOrEmail) {
      errors.userNameOrEmail = 'User Name or Email is required';
    } else if (!emailRegex.test(userNameOrEmail)) {
      errors.userNameOrEmail = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters and include a number.';
    }

    return errors;
  };

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

  const disableCopyPaste = (e) => {
    e.preventDefault();
    alert('Copying and pasting is not allowed for security reasons.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateInput(userNameOrEmail, password);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3500/signin',
        { userNameOrEmail, password },
        { withCredentials: true }
      );

      const userRole = response.data.role || 'student';
      navigate(userRole === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      if (error.response) {
        setErrors({
          ...errors,
          form: error.response.status === 401
            ? 'Invalid username or password.'
            : error.response.data.msg,
        });
      } else {
        setErrors({
          ...errors,
          form: 'Network error. Please try again later.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    setIsGoogleLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:3500/google-signin',
        { token: response.credential },
        { withCredentials: true }
      );

      const userRole = res.data.role || 'user';
      navigate(userRole === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      setErrors({
        ...errors,
        form: 'Google Sign-In failed. Please try again.',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    setErrors({ ...errors, form: 'Google Sign-In failed. Please try again.' });
    setIsGoogleLoading(false);
  };

  const handleFacebookLogin = () => {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email' }, async (userInfo) => {
          try {
            const res = await axios.post(
              'http://localhost:3500/facebook-signin',
              {
                accessToken: response.authResponse.accessToken,
                userID: response.authResponse.userID,
                email: userInfo.email,
                name: userInfo.name,
              },
              { withCredentials: true }
            );

            const userRole = res.data.role || 'user';
            navigate(userRole === 'admin' ? '/admin' : '/dashboard');
          } catch (error) {
            setErrors({
              ...errors,
              form: 'Facebook Sign-In failed. Please try again.',
            });
          }
        });
      } else {
        setErrors({ ...errors, form: 'Facebook Sign-In was cancelled.' });
      }
    }, { scope: 'email' });
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="userNameOrEmail">User Name or Email</label>
          <input
            id="userNameOrEmail"
            type="text"
            autoComplete="off"
            placeholder="User Name or Email"
            value={userNameOrEmail}
            onChange={handleUserNameOrEmailChange}
            disabled={isLoading}
            aria-invalid={!!errors.userNameOrEmail}
            aria-describedby="userNameOrEmail-error"
          />
          {errors.userNameOrEmail && (
            <span id="userNameOrEmail-error" className="error">
              {errors.userNameOrEmail}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              onCopy={disableCopyPaste}
              onPaste={disableCopyPaste}
              onCut={disableCopyPaste}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              role="button"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {errors.password && (
            <span id="password-error" className="error">
              {errors.password}
            </span>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="additional-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/reset-password">Reset Password</Link>
        </div>
      </form>
      <GoogleOAuthProvider clientId="704407656259-ha3mrlm9iiabod707h2nrulnrnlevdo5.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          buttonText={isGoogleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
        />
      </GoogleOAuthProvider>
      <button className="facebook-login-button" onClick={handleFacebookLogin} disabled={isLoading || isGoogleLoading}>
        {isLoading ? 'Signing in with Facebook...' : 'Sign in with Facebook'}
      </button>
      <p className="signin-prompt">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      {errors.form && <p className="error-message">{errors.form}</p>}
    </div>
  );
};

export default SignIn;
