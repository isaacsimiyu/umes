import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentApplications.css';
import TopBar from './TopBar';

// ✅ API URL setup
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3500";

const StudentApplications = () => {
  const [studentId, setStudentId] = useState(""); // Input for manual ID entry
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 Function to fetch applications
  const fetchApplications = async () => {
    if (!studentId) {
      toast.warn("Please enter a Student ID.");
      return;
    }

    console.log(`📡 Fetching applications for studentId: ${studentId}`);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/applications/${studentId}`);
      console.log("✅ API Response:", response.data);

      if (!response.data || !response.data.applications) {
        throw new Error("❌ Invalid API response structure.");
      }

      setApplications(response.data.applications);
      console.log("🛠 Applications state updated:", response.data.applications);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.response?.data?.message || 'Error fetching applications.');
      toast.error(err.response?.data?.message || "Error fetching applications.");
    } finally {
      setLoading(false);
      console.log("🔄 Fetch complete.");
    }
  };

  return (
    <div><TopBar/> 
    <div className="applications-container">
      <h2>My Applications</h2>

      {/* Student ID Input */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={fetchApplications}>Fetch Applications</button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-container">
          <CircularProgress />
          <p>Loading applications...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Debugging: Show API Response Data */}
      <pre>Debug Data: {JSON.stringify(applications, null, 2)}</pre>

      {/* Applications List */}
      {applications.length > 0 ? (
        <ul>
          {applications.map((app) => (
            <li key={app.applicationId} className="application-item">
              <strong>Course:</strong> {app.courseName} <br />
              <strong>University:</strong> {app.universityName} <br />
              <strong>Applied on:</strong> {new Date(app.applicationDate).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="no-applications">No applications found.</p>
      )}
      
    </div>
    </div>
  );
};

export default StudentApplications;
