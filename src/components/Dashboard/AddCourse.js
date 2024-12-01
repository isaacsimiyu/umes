import React, { useState } from 'react';
import { addCourse } from '../api'; // Import the API function

const AddCourse = ({ onCourseAdded }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const newCourse = {
        name: courseName,
        description: courseDescription,
      };

      await addCourse(newCourse);

      setSuccessMessage('Course added successfully!');
      setCourseName('');
      setCourseDescription('');

      if (onCourseAdded) {
        onCourseAdded(); // Notify parent component, if applicable
      }
    } catch (err) {
      setError('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="add-course">
      <h2>Add New Course</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
