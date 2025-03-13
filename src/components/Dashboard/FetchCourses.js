import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../api'; 
import './FetchCourses.css'; 

const FetchCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses(); 
        setCourses(data); 
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []); 
  return (
    <div className="fetch-courses">
      <h2>Available Courses</h2>

     
      {loading && <p className="loading">Loading courses...</p>}

    
      {error && <p className="error">{error}</p>}

     
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

     
      {!loading && !error && courses.length === 0 && (
        <p>No courses available at the moment.</p>
      )}
    </div>
  );
};

export default FetchCourses;
