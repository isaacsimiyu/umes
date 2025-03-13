import React, { useMemo, useState, useEffect } from "react";
import AdminTopBar from "./AdminTopBar";
import "./AssignCourses.css";

const BACKEND_URL = "http://localhost:3500/api"; // ✅ Backend API Base URL

const Message = ({ type, message, onClose }) => (
  <div className={`message ${type}-message`}>
    <p>{message}</p>
    <button onClick={onClose}>X</button>
  </div>
);

const AssignCourses = ({
  applications = [],
  courses = [],
  selectedCourses,
  actionLoading,
  error,
  success,
  onCloseMessage,
  onCourseChange,
}) => {
  const [loadingAssign, setLoadingAssign] = useState(null);
  const [approvedApplications, setApprovedApplications] = useState([]);

  // ✅ Log applications for debugging
  useEffect(() => {
    console.log("📢 Applications Data:", applications);
  }, [applications]);

  // ✅ Ensure only approved applications are stored
  useEffect(() => {
    const filteredApplications = applications.filter((app) => app.status === "approved");
    setApprovedApplications(filteredApplications);
    console.log("✅ Approved Applications:", filteredApplications);
  }, [applications]);

  // ✅ Function to Assign Course via Backend API
  const handleAssignCourse = async (applicationId, courseId) => {
    if (!applicationId || !courseId) {
      alert("⚠️ Please select a course before assigning.");
      return;
    }

    setLoadingAssign(applicationId);

    try {
      const response = await fetch(`${BACKEND_URL}/applications/${applicationId}/assign-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign course.");
      }

      alert("✅ Course assigned successfully!");

      // ✅ Update UI instead of reloading the page
      setApprovedApplications((prevApps) =>
        prevApps.map((app) =>
          app.applicationId === applicationId ? { ...app, assignedCourseId: courseId } : app
        )
      );
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoadingAssign(null);
    }
  };

  return (
    <div>
      <AdminTopBar />
      <section className="assign-courses">
        <h2>Assign Courses to Students</h2>

        {error && <Message type="error" message={error} onClose={() => onCloseMessage("error")} />}
        {success && <Message type="success" message={success} onClose={() => onCloseMessage("success")} />}

        {approvedApplications.length > 0 ? (
          <ul>
            {approvedApplications.map((student) => {
              const isAssigning = loadingAssign === student.applicationId;
              const selectedCourse = selectedCourses[student.applicationId] || "";

              return (
                <li key={student.applicationId}>
                  <h3>{student.studentName}</h3>
                  {student.assignedCourseId ? (
                    <p>
                      Assigned Course:{" "}
                      {courses.find((c) => c._id === student.assignedCourseId)?.name || "Unknown"}
                    </p>
                  ) : (
                    <>
                      <select
                        value={selectedCourse}
                        onChange={(e) => onCourseChange(student.applicationId, e.target.value)}
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </select>

                      {selectedCourse ? (
                        <button
                          onClick={() => handleAssignCourse(student.applicationId, selectedCourse)}
                          disabled={isAssigning}
                        >
                          {isAssigning ? "Assigning..." : "Assign Course"}
                        </button>
                      ) : (
                        <p className="error-text">⚠️ Please select a course.</p>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>⚠️ No approved applications available.</p>
        )}
      </section>
    </div>
  );
};

export default AssignCourses;
