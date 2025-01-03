import React, { useState } from 'react';
import './CourseApplicationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    idNumber: '',
    email: '',
    indexNumber: '',
    yearOfKCSE: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const validations = {
    firstName: /^[A-Za-z]{2,}$/,
    surname: /^[A-Za-z]{2,}$/,
    idNumber: /^[0-9]{7,8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    indexNumber: /^[0-9]{9}$/,
    yearOfKCSE: (value) => value >= 2024 && value <= currentYear + 6,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        valid = false;
      } else if (
        validations[key] &&
        (typeof validations[key] === 'function'
          ? !validations[key](value)
          : !validations[key].test(value))
      ) {
        newErrors[key] = `Invalid ${key.replace(/([A-Z])/g, ' $1')}`;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3500/api/students', formData);
        if (response.data.success) {
          localStorage.setItem('studentId', response.data.studentId);
          alert('Application submitted successfully!');
          setFormData({
            firstName: '',
            surname: '',
            idNumber: '',
            email: '',
            indexNumber: '',
            yearOfKCSE: '',
          });
          navigate('/apply-for-courses'); // Redirect to course application page
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Course Application Form</h1>
      <form onSubmit={handleSubmit} className="application-form">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error-input' : ''}
            aria-describedby="firstNameError"
          />
          {errors.firstName && <p id="firstNameError" className="error-text">{errors.firstName}</p>}
        </div>

        {/* Surname */}
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className={errors.surname ? 'error-input' : ''}
            aria-describedby="surnameError"
          />
          {errors.surname && <p id="surnameError" className="error-text">{errors.surname}</p>}
        </div>

        {/* ID Number */}
        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className={errors.idNumber ? 'error-input' : ''}
            aria-describedby="idNumberError"
          />
          {errors.idNumber && <p id="idNumberError" className="error-text">{errors.idNumber}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
            aria-describedby="emailError"
          />
          {errors.email && <p id="emailError" className="error-text">{errors.email}</p>}
        </div>

        {/* Index Number */}
        <div className="form-group">
          <label htmlFor="indexNumber">Index Number</label>
          <input
            type="text"
            id="indexNumber"
            name="indexNumber"
            value={formData.indexNumber}
            onChange={handleChange}
            className={errors.indexNumber ? 'error-input' : ''}
            aria-describedby="indexNumberError"
          />
          {errors.indexNumber && (
            <p id="indexNumberError" className="error-text">{errors.indexNumber}</p>
          )}
        </div>

        {/* Year of KCSE */}
        <div className="form-group">
          <label htmlFor="yearOfKCSE">Year of KCSE</label>
          <input
            type="text"
            id="yearOfKCSE"
            name="yearOfKCSE"
            value={formData.yearOfKCSE}
            onChange={handleChange}
            className={errors.yearOfKCSE ? 'error-input' : ''}
            aria-describedby="yearOfKCSEError"
          />
          {errors.yearOfKCSE && (
            <p id="yearOfKCSEError" className="error-text">{errors.yearOfKCSE}</p>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default CourseApplicationForm;
