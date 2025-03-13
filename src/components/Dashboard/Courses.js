import React, { useState, useEffect } from 'react'; 
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Courses.css';
import TopBar from './TopBar';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/courses');
      console.log('Fetched courses:', response.data);

      const parsedCourses = response.data.courses.map(course => ({
        ...course,
        competencies: typeof course.competencies === 'string'
          ? JSON.parse(course.competencies || '[]')
          : Array.isArray(course.competencies) ? course.competencies : [],
        learningOutcomes: typeof course.learningOutcomes === 'string'
          ? JSON.parse(course.learningOutcomes || '[]')
          : Array.isArray(course.learningOutcomes) ? course.learningOutcomes : [],
      }));

      console.log('Parsed courses:', parsedCourses);
      setCourses(parsedCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses.');
      toast.error('Failed to load courses.');
    }
  };

  // Fetch universities from API
  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/universities');
      console.log('Fetched universities:', response.data);
      setUniversities(response.data.universities || []);
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Failed to load universities.');
      toast.error('Failed to load universities.');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchCourses(), fetchUniversities()]);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="course-apply-container">
      <TopBar />
      <ToastContainer />

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <CircularProgress />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          {/* Course Details Section */}
          <div className="course-details">
            <h2>Course Details</h2>
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="course-item">
                  <p><strong>ID:</strong> {course.id || 'N/A'}</p>
                  <p><strong>Name:</strong> {course.name || 'N/A'}</p>
                  <p><strong>Description:</strong> {course.description || 'N/A'}</p>
                  <p><strong>Duration:</strong> {course.duration || 'N/A'}</p>
                  <p><strong>Level:</strong> {course.level || 'N/A'}</p>
                  <p><strong>Cutoff:</strong> {course.cutoff || 'N/A'}</p>
                  <p><strong>Competencies:</strong> 
                    {Array.isArray(course.competencies) && course.competencies.length > 0 
                      ? course.competencies.join(', ') 
                      : 'No competencies available'}
                  </p>
                  <p><strong>Learning Outcomes:</strong></p>
                  <ul>
                    {Array.isArray(course.learningOutcomes) && course.learningOutcomes.length > 0 ? (
                      course.learningOutcomes.map((outcome, i) => (
                        <li key={i}>{outcome}</li>
                      ))
                    ) : (
                      <li style={{ color: 'red' }}>No learning outcomes provided.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>

          {/* University Details Section */}
          <div className="university">
            <h2>University Details</h2>
            {universities.length > 0 ? (
              universities.map((university) => (
                <div key={university.id} className="university-item">
                  <p><strong>ID:</strong> {university.id || 'N/A'}</p>
                  <p><strong>Name:</strong> {university.name || 'N/A'}</p>
                  <p><strong>Location:</strong> {university.location || 'N/A'}</p>
                </div>
              ))
            ) : (
              <p>No universities available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
