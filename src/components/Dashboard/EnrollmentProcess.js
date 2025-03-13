import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import {
  fetchCourses,
  applyForCourse,
  fetchApplications,
  fetchStudentProgress,
} from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EnrollmentProcess.css';

const EnrollmentProcess = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [applications, setApplications] = useState([]);
  const [progress, setProgress] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!studentId) {
      toast.error('Student ID is required to load enrollment data.');
      return;
    }

    const loadData = async () => {
      try {
        setDataLoading(true);

        const [coursesData, applicationsData, progressData] = await Promise.all([
          fetchCourses(),
          fetchApplications(),
          fetchStudentProgress(studentId),
        ]);

        console.log('Courses Data:', coursesData); 

        
        setCourses(Array.isArray(coursesData.data) ? coursesData.data : []);

        setApplications(
          Array.isArray(applicationsData)
            ? applicationsData.filter((app) => app.studentId === studentId)
            : []
        );
        setProgress(progressData);
      } catch (err) {
        toast.error('Failed to load enrollment data. Please try again.');
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, [studentId]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.error('Please select a course to apply.');
      return;
    }

    try {
      setApplying(true);

      await applyForCourse(selectedCourse, studentId);

      const updatedApplications = await fetchApplications();
      setApplications(
        Array.isArray(updatedApplications)
          ? updatedApplications.filter((app) => app.studentId === studentId)
          : []
      );

      toast.success('Application submitted successfully!');
      setSelectedCourse('');
    } catch (err) {
      toast.error(err.message || 'Failed to apply for the course. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const renderCourseOptions = () => {
    if (!Array.isArray(courses) || courses.length === 0) {
      return <option disabled>No courses available</option>;
    }

    return courses.map((course) => {
      const alreadyApplied = applications.some((app) => app.courseId === course._id);
      return (
        <option key={course._id} value={course._id} disabled={alreadyApplied}>
          {course.name} (Cutoff: {course.cutoff}) {alreadyApplied ? '(Applied)' : ''}
        </option>
      );
    });
  };

  const renderApplications = () => {
    if (!Array.isArray(applications) || applications.length === 0) {
      return <p>You have not applied for any courses yet.</p>;
    }

    return (
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>
              <strong>Course:</strong> {app.courseName}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const renderProgress = () => {
    if (!progress) {
      return <p>No progress data available.</p>;
    }

    return (
      <ul>
        <li>
          <strong>Applications Submitted:</strong> {progress.applicationsSubmitted}
        </li>
        <li>
          <strong>Courses Enrolled:</strong> {progress.coursesEnrolled}
        </li>
        <li>
          <strong>Status:</strong> {progress.status}
        </li>
      </ul>
    );
  };

  return (
    <div className="enrollment-process">
      <h1>Enrollment Process</h1>

      {dataLoading ? (
        <div className="loader">Loading enrollment data...</div>
      ) : (
        <>
          <section className="apply-course">
            <h2>Apply for a Course</h2>
            <form onSubmit={handleApply}>
              <label htmlFor="course-select">Select a Course:</label>
              <select
                id="course-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select a Course</option>
                {renderCourseOptions()}
              </select>
              <button type="submit" disabled={applying}>
                {applying ? 'Applying...' : 'Apply'}
              </button>
            </form>
          </section>

          <section className="application-status">
            <h2>Your Applications</h2>
            {renderApplications()}
          </section>

          <section className="progress-tracking">
            <h2>Enrollment Progress</h2>
            {renderProgress()}
          </section>
        </>
      )}
    </div>
  );
};


EnrollmentProcess.propTypes = {
  studentId: PropTypes.string.isRequired, 
};

export default EnrollmentProcess;
