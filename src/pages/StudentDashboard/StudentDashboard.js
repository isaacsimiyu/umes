// src/pages/StudentDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetchCourses();
    fetchApplications();
  }, []);

  const fetchCourses = async () => {
    const result = await axios.get("/api/courses");
    setCourses(result.data);
  };

  const fetchApplications = async () => {
    const result = await axios.get(`/api/applications?studentId=${student.id}`);
    setApplications(result.data);
  };

  const handleApply = async (courseId) => {
    // Check eligibility and apply
    const course = courses.find((c) => c.id === courseId);
    if (student.grade >= course.cutoff) {
      await axios.post("/api/applications", { studentId: student.id, courseId });
      fetchApplications();
    } else {
      alert("You are not eligible for this course.");
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Available Courses</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>Cutoff Point: {course.cutoff}</p>
          <button onClick={() => handleApply(course.id)}>Apply</button>
        </div>
      ))}
      <h2>Your Applications</h2>
      {applications.map((app) => (
        <div key={app.id}>
          <h4>Course: {app.courseName}</h4>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
