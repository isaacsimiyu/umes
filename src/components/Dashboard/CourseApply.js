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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseResponse, universityResponse] = await Promise.all([
          axios.get('http://localhost:3500/api/courses'),
          axios.get('http://localhost:3500/api/universities'),
        ]);
        setCourses(courseResponse.data.courses);
        setUniversities(universityResponse.data.universities);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitApplication = async () => {
    if (!studentId || !courseId || !universityId) {
      toast.warn('Please fill in all fields: Student ID, Course ID, and University ID.');
      return;
    }

    if (![studentId, courseId, universityId].every((id) => /^\d+$/.test(id))) {
      toast.error('All IDs must be numeric.');
      return;
    }

    try {
      toast.info('Submitting application...');
      const response = await axios.post('http://localhost:3500/api/applications', {
        studentId,
        courseId,
        universityId,
      });

      if (response.status === 201) {
        toast.success('Application submitted successfully!');
        setStudentId('');
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

  const selectedCourse = courses.find((course) => course.id.toString() === courseId);
  const selectedUniversity = universities.find((university) => university.id.toString() === universityId);

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

              {/* Submit Button Above the Displayed Course & University */}
              <button type="submit" className="submit-btn">
                Submit Application
              </button>
            </form>

            {/* Display Selected Course Below the Submit Button */}
            {selectedCourse && (
              <div className="course-details">
                <h2>Selected Course</h2>
                <h3>{selectedCourse.name}</h3>
                <p>{selectedCourse.description}</p>
                <p><strong>Cutoff:</strong> {selectedCourse.cutoff}</p>
                <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                <p><strong>Level:</strong> {selectedCourse.level}</p>

                <p><strong>Competencies:</strong></p>
                <ul>
                  {(Array.isArray(selectedCourse.competencies)
                    ? selectedCourse.competencies
                    : (() => {
                        try {
                          const parsed = JSON.parse(selectedCourse.competencies);
                          return Array.isArray(parsed) ? parsed : [];
                        } catch {
                          return [];
                        }
                      })()
                  ).map((competency, index) => (
                    <li key={index}>{competency}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display Selected University Below the Submit Button */}
            {selectedUniversity && (
              <div className="university-details">
                <h2>Selected University</h2>
                <h3>{selectedUniversity.name}</h3>
                <p>{selectedUniversity.location}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseApply;
