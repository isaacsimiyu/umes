import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../api'; // Import the API function
import './FetchCourses.css'; // Import the associated styles

const FetchCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses(); // Call the API
        setCourses(data); // Set the fetched courses
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="fetch-courses">
      <h2>Available Courses</h2>

      {/* Loading State */}
      {loading && <p className="loading">Loading courses...</p>}

      {/* Error State */}
      {error && <p className="error">{error}</p>}

      {/* Courses List */}
      {!loading && !error && courses.length > 0 && (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p><strong>Duration:</strong> {course.duration} weeks</p>
            </li>
          ))}
        </ul>
      )}

      {/* No Courses Found */}
      {!loading && !error && courses.length === 0 && (
        <p>No courses available at the moment.</p>
      )}
    </div>
  );
};

export default FetchCourses;
