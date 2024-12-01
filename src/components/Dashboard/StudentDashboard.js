import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student data when the component mounts
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);

      // Fetch enrolled courses
      const coursesResponse = await axios.get('/api/student/courses');
      setCourses(coursesResponse.data);

      // Fetch notifications
      const notificationsResponse = await axios.get('/api/student/notifications');
      setNotifications(notificationsResponse.data);

      // Fetch application status
      const statusResponse = await axios.get('/api/student/application-status');
      setApplicationStatus(statusResponse.data.status);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Welcome to Your Dashboard</h1>

      {loading && <p>Loading your data...</p>}

      {!loading && (
        <>
          {/* Application Status */}
          <section className="application-status">
            <h2>Application Status</h2>
            <p>{applicationStatus ? applicationStatus : 'No application found.'}</p>
          </section>

          {/* Enrolled Courses */}
          <section className="enrolled-courses">
            <h2>Your Enrolled Courses</h2>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    <h3>{course.name}</h3>
                    <p>Progress: {course.progress}%</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You are not enrolled in any courses yet.</p>
            )}
          </section>

          {/* Notifications */}
          <section className="notifications">
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id}>{notification.message}</li>
                ))}
              </ul>
            ) : (
              <p>No notifications at the moment.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
