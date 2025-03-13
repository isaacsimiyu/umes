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
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('user'); // New state for role (user/admin)
  const [secretKey, setSecretKey] = useState(''); // State for admin secret key
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const userNameOrEmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_]{3,15}$/;
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  const studentIdRegex = /^\d{5}$/;

  const handleUserNameOrEmailChange = (e) => {
    setUserNameOrEmail(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, userNameOrEmail: '' }));
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, studentId: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmationPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userNameOrEmailRegex.test(userNameOrEmail.trim())) {
      newErrors.userNameOrEmail = 'Enter a valid email or username.';
    }

    if (!passwordRegex.test(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters and include a number.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!phone || !phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Phone number must be valid and at least 10 digits.';
    }

    if (!studentId || !studentIdRegex.test(studentId.trim())) {
      newErrors.studentId = 'Student ID must be exactly 5 digits.';
    }

    if (role === 'admin' && !secretKey.trim()) {
      newErrors.secretKey = 'Secret key is required for admin registration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3500/signup', {
          userNameOrEmail,
          password,
          studentId,
          phone,
          role,
          secretKey: role === 'admin' ? secretKey : undefined, // Include secretKey for admin
        });

        console.log('Response:', response.data);
        setIsSuccess(true);
        setUserNameOrEmail('');
        setStudentId('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setRole('user'); // Reset role to default
        setSecretKey(''); // Reset secret key
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

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            id="userNameOrEmail"
            type="text"
            placeholder="User Name or Email"
            value={userNameOrEmail}
            onChange={handleUserNameOrEmailChange}
            disabled={isLoading}
          />
          {errors.userNameOrEmail && <span className="error">{errors.userNameOrEmail}</span>}
        </div>

        <div className="form-group">
          <input
            id="studentId"
            type="text"
            placeholder="Student ID or Birth Cert No"
            value={studentId}
            onChange={handleStudentIdChange}
            disabled={isLoading}
          />
          {errors.studentId && <span className="error">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={handlePhoneChange}
            inputProps={{ name: 'phone', required: true }}
            disabled={isLoading}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={isLoading}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmationPasswordVisibility}
            />
          </div>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === 'admin' && (
          <div className="form-group">
            <input
              id="secretKey"
              type="text"
              placeholder="Enter Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              disabled={isLoading}
            />
            {errors.secretKey && <span className="error">{errors.secretKey}</span>}
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        {isSuccess && (
          <p className="success-message">Successfully signed up! You can now <a href="/signin">Sign In</a>.</p>
        )}

        {errors.form && <p className="error-message">{errors.form}</p>}

        <p className="signin-prompt">Already have an account? <a href="/signin">Sign In</a></p>
      </form>
    </div>
  );
};

export default Signup;
