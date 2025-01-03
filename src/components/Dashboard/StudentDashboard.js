import React, { useState, useEffect } from 'react';
import { fetchCourses, fetchUniversities } from '../../api'; // Import API functions
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Fetch student data (courses and universities) on component mount
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    setError(null); // Reset errors

    try {
      // Fetch data from APIs
      const [courseData, universityData] = await Promise.all([
        fetchCourses(),
        fetchUniversities(),
      ]);

      setCourses(courseData);
      setUniversities(universityData);

      // Example notifications (could come from another API in the future)
      setNotifications([
        { id: 1, message: 'Your course application has been approved!' },
        { id: 2, message: 'New course available: Quantum Physics' },
      ]);

      // Example application status
      setApplicationStatus('Approved');
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter search results dynamically
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();

      const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(lowercasedQuery)
      );

      const filteredUniversities = universities.filter((university) =>
        university.name.toLowerCase().includes(lowercasedQuery)
      );

      // Merge results into a single array with a type field
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
          <p className="error">{error}</p> // Show error if something went wrong
        ) : (
          <>
            {/* Search Results */}
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

            {/* Application Status */}
            <section className="application-status">
              <h2>Application Status</h2>
              <p>{applicationStatus ? applicationStatus : 'No application found.'}</p>
            </section>

            {/* Enrolled Courses */}
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
    </div>
  );
};

export default StudentDashboard;
