import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchCourses,
  fetchApplications,
  approveApplication,
  rejectApplication,
  assignCourse,
  addCourse,
  updateCourse,
} from "../../api";
import "./AdmissionsDashboard.css";
import AdminTopBar from "./AdminTopBar";

// ✅ Reusable Message Component
const Message = ({ type, message, onClose }) => (
  <div className={`message ${type}-message`}>
    <p>{message}</p>
    <button onClick={onClose}>X</button>
  </div>
);

// ✅ Pending Applications Component
const PendingApplications = ({ applications, actionLoading, onApprove, onReject }) => (
  <section className="manage-applications">
    <h2>Pending Applications</h2>
    {applications.length > 0 ? (
      <ul>
        {applications.map((app) => (
          <li key={app.applicationId || app._id}>
            <h3>{app.studentName}</h3>
            <p>Email: {app.studentEmail}</p>
            <p>Applied Course: {app.courseName}</p>
            <button
              onClick={() => onApprove(app.applicationId || app._id)}
              disabled={actionLoading === app.applicationId}
            >
              {actionLoading === app.applicationId ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={() => onReject(app.applicationId || app._id)}
              disabled={actionLoading === app.applicationId}
            >
              {actionLoading === app.applicationId ? "Rejecting..." : "Reject"}
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No pending applications.</p>
    )}
  </section>
);




const AssignCourses = ({ applications, courses, selectedCourses, actionLoading, setActionLoading, onCourseChange, onAssignCourse }) => {
  const approvedApplications = useMemo(() => applications.filter(app => app.status === "approved"), [applications]);

  return (
    <div>
      <AdminTopBar />
      <section className="assign-courses">
        <h2>Assign Courses to Students</h2>
        {approvedApplications.length > 0 ? (
          <ul>
            {approvedApplications.map((student) => {
              const isAssigning = actionLoading === student.applicationId;
              const selectedCourse = selectedCourses[student.applicationId] || "";

              return (
                <li key={student.applicationId}>
                  <h3>{student.studentName}</h3>
                  {student.assignedCourseId ? (
                    <p>Assigned Course: {courses.find(c => c._id === student.assignedCourseId)?.name || "Unknown"}</p>
                  ) : (
                    <>
                      <select value={selectedCourse} onChange={(e) => onCourseChange(student.applicationId, e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </select>

                      {selectedCourse ? (
                        <button onClick={() => onAssignCourse(student.applicationId, selectedCourse)} disabled={isAssigning}>
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
          <p>No approved applications available.</p>
        )}
      </section>
    </div>
  );
};



// ✅ Manage Courses Component
const ManageCourses = ({ courses, onAddCourse, onUpdateCourse }) => {
  const [newCourse, setNewCourse] = useState({ name: "", description: "", cutoff: "" });

  const handleAdd = () => {
    if (newCourse.name && newCourse.description && !isNaN(newCourse.cutoff)) {
      onAddCourse(newCourse);
      setNewCourse({ name: "", description: "", cutoff: "" });
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <section className="manage-courses">
      <h2>Manage Courses</h2>
      <div className="add-course">
        <input type="text" placeholder="Course Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
        <textarea placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
        <input type="number" placeholder="Cutoff Score" value={newCourse.cutoff} onChange={(e) => setNewCourse({ ...newCourse, cutoff: e.target.value })} />
        <button onClick={handleAdd}>Add Course</button>
      </div>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Cutoff: {course.cutoff}</p>
              <button onClick={() => onUpdateCourse(course._id)}>Update</button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </section>
  );
};

// ✅ Main AdmissionsDashboard Component
const AdmissionsDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [coursesData, applicationsData] = await Promise.all([fetchCourses(), fetchApplications()]);
      setCourses(coursesData?.courses || []);
      setApplications(applicationsData?.applications || []);
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleApprove = async (appId) => {
    if (!appId) return setError("❌ ERROR: Invalid application ID.");
    try {
      setActionLoading(appId);
      await approveApplication(appId);
      setApplications((prev) =>
        prev.map((app) => (app.applicationId === appId ? { ...app, status: "approved" } : app))
      );
      setSuccess("✅ Application approved successfully.");
    } catch (err) {
      setError(err.message || "Failed to approve application.");
    } finally {
      setActionLoading(null);
    }
  };
  
  // ✅ Add handleReject function right after handleApprove
  const handleReject = async (appId) => {
    if (!appId) return setError("❌ ERROR: Invalid application ID.");
    try {
      setActionLoading(appId);
      await rejectApplication(appId);
      setApplications((prev) => prev.filter((app) => app.applicationId !== appId));
      setSuccess("✅ Application rejected successfully.");
    } catch (err) {
      setError(err.message || "Failed to reject application.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignCourse = async (applicationId, courseId) => {
    if (!applicationId || !courseId) {
      setError("❌ ERROR: Invalid application ID or Course ID.");
      return;
    }
  
    setActionLoading(applicationId);
    console.log(`📢 Assigning Course (ID: ${courseId}) to Application (ID: ${applicationId})`);
  
    try {
      await assignCourse(applicationId, courseId);
      
      // ✅ Optimistically update UI instead of waiting for re-fetch
      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId ? { ...app, assignedCourseId: courseId } : app
        )
      );
  
      setSuccess(`✅ Successfully assigned course!`);
    } catch (err) {
      console.error("❌ ERROR: Failed to assign course:", err);
      setError(err.response?.data?.message || "Failed to assign course.");
    } finally {
      setActionLoading(null);
    }
  };
  const handleCourseChange = useCallback((applicationId, courseId) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [applicationId]: courseId,
    }));
  }, []);
  
  
 
  
  return (
    <div className="admissions-dashboard">
      <h1>Admissions Dashboard</h1>
      {error && <Message type="error" message={error} onClose={() => setError(null)} />}
      {success && <Message type="success" message={success} onClose={() => setSuccess(null)} />}
      {loading ? <p>Loading...</p> : (
        <>
          <PendingApplications applications={applications} actionLoading={actionLoading} onApprove={handleApprove} onReject={handleReject} />
          <AssignCourses
  applications={applications}
  courses={courses}
  selectedCourses={selectedCourses}
  actionLoading={actionLoading}
  setActionLoading={setActionLoading}
  onCourseChange={handleCourseChange} 
  onAssignCourse={handleAssignCourse} 
/>

          <ManageCourses courses={courses} onAddCourse={addCourse} onUpdateCourse={updateCourse} />
        </>
      )}
    </div>
  );
};

export default AdmissionsDashboard;
