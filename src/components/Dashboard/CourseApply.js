import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CourseApply.css';
import TopBar from './TopBar';
import axios from 'axios';

const CourseApply = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/courses');
      setCourses(response.data.courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses.');
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/universities');
      setUniversities(response.data.universities);
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Failed to load universities.');
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCourses(), fetchUniversities()])
      .then(() => setError(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmitApplication = async () => {
    if (!studentId || !courseId || !universityId) {
      toast.warn('Please fill in all fields: Student ID, Course ID, and University ID.');
      return;
    }

    const newApplication = {
      studentId,
      courseId,
      universityId,
    };

    toast.info('Submitting application...');
    try {
      const response = await axios.post(
        'http://localhost:3500/api/applications',
        newApplication
      );

      if (response.status === 201) {
        toast.success('Application submitted successfully!');
        setStudentId(''); // Reset fields after successful submission
        setCourseId('');
        setUniversityId('');
      } else {
        throw new Error('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit the application.');
    }
  };

  return (
    <div>
      <TopBar />
      <ToastContainer />
      <div className="course-apply">
        <h1>Apply for a Course and University</h1>
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
          <div className="form-container">
            <h2>Fill in Your Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitApplication();
              }}
            >
              <div className="form-group">
                <label htmlFor="studentId">Student ID:</label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your Student ID"
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseId">Course ID:</label>
                <input
                  type="text"
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  placeholder="Enter the Course ID"
                />
              </div>

              <div className="form-group">
                <label htmlFor="universityId">University ID:</label>
                <input
                  type="text"
                  id="universityId"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  placeholder="Enter the University ID"
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit Application
              </button>
            </form>

            <h2>Available Courses</h2>
            <ul className="course-list">
              {courses.map((course) => (
                <li key={course.id}>
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                  <p><strong>Course ID:</strong> {course.id}</p>
                  <p><strong>Cutoff:</strong> {course.cutoff}</p>
                </li>
              ))}
            </ul>

            <h2>Available Universities</h2>
            <ul className="university-list">
              {universities.map((university) => (
                <li key={university.id}>
                  <h3>{university.name}</h3>
                  <p>{university.location}</p>
                  <p><strong>University ID:</strong> {university.id}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseApply;
