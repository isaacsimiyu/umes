import React, { useState, useEffect } from 'react';
import { fetchStudentProgress } from '../api'; 
import './ProgressTracker.css';

const ProgressTracker = ({ studentId }) => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentProgress(studentId); 
        setProgressData(data);
      } catch (err) {
        setError('Failed to load progress data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [studentId]);

  if (loading) {
    return <p>Loading progress...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (progressData.length === 0) {
    return <p>No progress data available.</p>;
  }

  return (
    <div className="progress-tracker">
      <h1>Progress Tracker</h1>
      <ul className="progress-list">
        {progressData.map((course) => (
          <li key={course.id} className="progress-item">
            <div className="course-header">
              <h3>{course.name}</h3>
              <span>{course.progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;
