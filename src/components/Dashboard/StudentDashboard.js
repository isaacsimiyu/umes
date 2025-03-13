import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDashboard.css';


export const fetchCourses = async () => {
  const response = await axios.get('http://localhost:3500/api/courses');
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses');
  }
  return response.data; 
};


export const fetchUniversities = async () => {
  const response = await axios.get('http://localhost:3500/api/universities');
  if (response.status !== 200) {
    throw new Error('Failed to fetch universities');
  }
  return response.data; 
};

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [courseData, universityData] = await Promise.all([
        fetchCourses(),
        fetchUniversities(),
      ]);

      setCourses(courseData);
      setUniversities(universityData);

      
      setNotifications([
        { id: 1, message: 'Your course application has been approved!' },
        { id: 2, message: 'New course available: Education Science' },
      ]);

      setApplicationStatus('Approved');
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();

      const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(lowercasedQuery)
      );

      const filteredUniversities = universities.filter((university) =>
        university.name.toLowerCase().includes(lowercasedQuery)
      );

      setFilteredResults([
        ...filteredCourses.map((course) => ({ ...course, type: 'course' })),
        ...filteredUniversities.map((university) => ({
          ...university,
          type: 'university',
        })),
      ]);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, courses, universities]);

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search courses or universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>

        {loading ? (
          <p>Loading your data...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {searchQuery && (
              <section className="search-results">
                <h2>Search Results</h2>
                {filteredResults.length > 0 ? (
                  <ul>
                    {filteredResults.map((result, index) => (
                      <li key={index}>
                        {result.type === 'course' ? (
                          <span>📘 Course: {result.name}</span>
                        ) : (
                          <span>🎓 University: {result.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No results found for "{searchQuery}".</p>
                )}
              </section>
            )}

            <section className="application-status">
              <h2>Application Status</h2>
              <p>{applicationStatus || 'No application found.'}</p>
            </section>

            <section className="enrolled-courses">
              <h2>Available Courses</h2>
              {courses.length > 0 ? (
                <ul>
                  {courses.map((course) => (
                    <li key={course._id}>
                      <h3>{course.name}</h3>
                      <p>{course.description}</p>
                      <p>
                        <strong>University:</strong>{' '}
                        {course.universityId?.name || 'Unknown'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No courses available at the moment.</p>
              )}
            </section>

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
    </div>
  );
};

export default StudentDashboard;
