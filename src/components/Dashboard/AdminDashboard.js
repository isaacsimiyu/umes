import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', cutoff: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await axios.get('/api/courses');
      setCourses(result.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!newCourse.name || !newCourse.cutoff) {
      setError('Please provide both course name and cutoff.');
      return;
    }

    try {
      await axios.post('/api/courses', newCourse);
      setNewCourse({ name: '', cutoff: '' }); // Reset form
      setError('');
      fetchCourses(); // Refresh course list
    } catch (err) {
      setError('Failed to add course. Please try again later.');
    }
  };

  // Handle cutoff update
  const handleCutoffUpdate = async (programId, cutoff) => {
    try {
      await axios.put(`/api/programs/${programId}/cutoff`, { cutoff });
      fetchCourses(); // Refresh course list
      setError('');
    } catch (err) {
      setError('Failed to update cutoff. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Courses and Programs</h2>

      {/* Display error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add New Course Form */}
      <form onSubmit={handleAddCourse}>
        <h3>Add New Course</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cutoff Point"
          value={newCourse.cutoff}
          onChange={(e) => setNewCourse({ ...newCourse, cutoff: e.target.value })}
        />
        <button type="submit">Add Course</button>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading courses...</p>}

      {/* Display Existing Courses */}
      {!loading && courses.length > 0 && (
        <div>
          <h3>Existing Courses</h3>
          {courses.map((course) => (
            <div key={course.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h4>{course.name}</h4>
              <p>Cutoff Point: {course.cutoff}</p>
              <input
                type="number"
                placeholder="Set new cutoff"
                onBlur={(e) => handleCutoffUpdate(course.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && <p>No courses available.</p>}
    </div>
  );
}

export default AdminDashboard;
