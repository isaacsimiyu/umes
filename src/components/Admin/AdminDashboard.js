import React, { useState, useEffect } from "react";
import { fetchCourses, addCourse, updateCutoff, deleteCourse } from "../../api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]); // Ensure courses starts as an empty array
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    cutoff: "",
    competencies: "",
    duration: "",
    level: "",
    learningOutcomes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(1);
  const coursesPerPage = 5;
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  // Fetch courses from the API
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        if (Array.isArray(data)) {
          setCourses(data); // Ensure data is set only if it's an array
        } else {
          setCourses([]); // Fallback to an empty array if data is not an array
        }
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        setTimeout(() => setError(null), 3000);
        setCourses([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Ensure paginatedCourses only runs if courses is an array
  const paginatedCourses = Array.isArray(courses)
    ? courses.slice((page - 1) * coursesPerPage, page * coursesPerPage)
    : [];
    const handleAddCourse = async (e) => {
      e.preventDefault();
    
      const {
        name,
        description,
        cutoff,
        competencies,
        duration,
        level,
        learningOutcomes, // From frontend
      } = newCourse;
    
      // Create backend payload
      const payload = {
        name,
        description,
        cutoff: Number(cutoff),
        competencies: competencies.split(',').map((item) => item.trim()),
        duration,
        level,
        learning_outcomes: learningOutcomes.split(',').map((item) => item.trim()),
      };
    
      console.log('Payload being sent to the API:', payload); // Log the payload for debugging
    
      try {
        const addedCourse = await addCourse(payload);
        setCourses([...courses, addedCourse]);
        setNewCourse({
          name: "",
          description: "",
          cutoff: "",
          competencies: "",
          duration: "",
          level: "",
          learningOutcomes: "",
        });
        setSuccess("Course added successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error("Error adding course:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to add course. Please try again.");
        setTimeout(() => setError(null), 3000);
      }
    };
    

  const handleUpdateCutoff = async (courseId, newCutoff) => {
    if (!newCutoff || isNaN(newCutoff) || newCutoff <= 0) {
      setError("Please enter a valid positive cutoff value.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoadingCourseId(courseId);

    try {
      await updateCutoff(courseId, newCutoff);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, cutoff: newCutoff, newCutoff: "" }
            : course
        )
      );
      setSuccess("Cutoff updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update cutoff. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingCourseId(null);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setLoadingCourseId(courseId);

    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      setSuccess("Course deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to delete course. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingCourseId(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {error && <Message type="error" message={error} onClose={() => setError(null)} />}
      {success && <Message type="success" message={success} onClose={() => setSuccess(null)} />}

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <>
          <section className="add-course">
            <h2>Add New Course</h2>
            <form onSubmit={handleAddCourse}>
              <InputField
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, name: value })
                }
              />
              <TextareaField
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, description: value })
                }
              />
              <InputField
                placeholder="Cutoff Score"
                type="number"
                value={newCourse.cutoff}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, cutoff: value })
                }
              />
              <InputField
                placeholder="Competencies"
                value={newCourse.competencies}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, competencies: value })
                }
              />
              <InputField
                placeholder="Duration (e.g., 6 months)"
                value={newCourse.duration}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, duration: value })
                }
              />
              <InputField
                placeholder="Level (Beginner, Intermediate, Advanced)"
                value={newCourse.level}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, level: value })
                }
              />
              <TextareaField
                placeholder="Learning Outcomes"
                value={newCourse.learningOutcomes}
                onChange={(value) =>
                  setNewCourse({ ...newCourse, learningOutcomes: value })
                }
              />
              <button type="submit">Add Course</button>
            </form>
          </section>

          <section className="manage-courses">
            <h2>Manage Courses</h2>
            {courses.length > 0 ? (
              <ul>
                {paginatedCourses.map((course) => (
                  <li key={course._id}>
                    <h3>{course.name}</h3>
                    <p>{course.description}</p>
                    <p>
                      <strong>Cutoff:</strong> {course.cutoff}
                    </p>
                    <InputField
                      placeholder="Update Cutoff"
                      type="number"
                      value={course.newCutoff || ""}
                      onChange={(value) =>
                        setCourses((prevCourses) =>
                          prevCourses.map((c) =>
                            c._id === course._id
                              ? { ...c, newCutoff: value }
                              : c
                          )
                        )
                      }
                      min="1"
                      disabled={loadingCourseId === course._id}
                    />
                    <button
                      onClick={() =>
                        handleUpdateCutoff(course._id, course.newCutoff)
                      }
                      disabled={loadingCourseId === course._id}
                    >
                      {loadingCourseId === course._id
                        ? "Updating..."
                        : "Update"}
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      disabled={loadingCourseId === course._id}
                    >
                      {loadingCourseId === course._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
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

const Message = ({ type, message, onClose }) => (
  <div className={`message ${type}-message`} onClick={onClose}>
    <p>{message}</p>
    <button>Dismiss</button>
  </div>
);

const InputField = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const TextareaField = ({ placeholder, value, onChange }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Pagination = ({ page, totalPages, onPrevious, onNext, disabled }) => (
  <div className="pagination">
    <button disabled={page === 1 || disabled} onClick={onPrevious}>
      Previous
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button disabled={page >= totalPages || disabled} onClick={onNext}>
      Next
    </button>
  </div>
);

export default AdminDashboard;
