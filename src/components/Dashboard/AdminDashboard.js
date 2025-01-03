import React, { useState, useEffect } from 'react';
import { fetchCourses, addCourse, updateCutoff, handleApiCall } from '../../api'; // Import your API functions
import './AdminDashboard.css'; // Import the associated styles

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', cutoff: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Handle adding a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.description || !newCourse.cutoff) {
      alert('Please fill in all fields before adding a course.');
      return;
    }

    try {
      const addedCourse = await addCourse(newCourse);
      setCourses([...courses, addedCourse]); // Update the course list
      setNewCourse({ name: '', description: '', cutoff: '' }); // Reset form
    } catch (err) {
      setError('Failed to add course. Please try again.');
    }
  };

  // Handle updating a course's cutoff value
  const handleUpdateCutoff = async (courseId, newCutoff) => {
    if (!newCutoff) {
      alert('Please enter a valid cutoff value.');
      return;
    }

    try {
      const updatedCourse = await updateCutoff(courseId, newCutoff);
      setCourses(courses.map((course) =>
        course._id === courseId ? updatedCourse : course
      ));
    } catch (err) {
      setError('Failed to update cutoff. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <>
          {/* Add New Course Form */}
          <section className="add-course">
            <h2>Add New Course</h2>
            <form onSubmit={handleAddCourse}>
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                required
              ></textarea>
              <input
                type="number"
                placeholder="Cutoff Score"
                value={newCourse.cutoff}
                onChange={(e) => setNewCourse({ ...newCourse, cutoff: e.target.value })}
                required
              />
              <button type="submit">Add Course</button>
            </form>
          </section>

          {/* Manage Courses Section */}
          <section className="manage-courses">
            <h2>Manage Courses</h2>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course._id}>
                    <h3>{course.name}</h3>
                    <p>{course.description}</p>
                    <p><strong>Cutoff:</strong> {course.cutoff}</p>
                    <input
                      type="number"
                      placeholder="Update Cutoff"
                      onBlur={(e) => handleUpdateCutoff(course._id, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses available. Please add some courses.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
