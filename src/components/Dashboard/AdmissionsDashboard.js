
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdmissionsDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const result = await axios.get("/api/applications");
    setApplications(result.data);
  };

  const handleDecision = async (applicationId, decision) => {
    await axios.put(`/api/applications/${applicationId}/decision`, { decision });
    fetchApplications();
  };

  return (
    <div>
      <h1>Admissions Dashboard</h1>
      {applications.map((app) => (
        <div key={app.id}>
          <h3>{app.studentName} applied for {app.courseName}</h3>
          <p>Status: {app.status}</p>
          <button onClick={() => handleDecision(app.id, "accepted")}>Accept</button>
          <button onClick={() => handleDecision(app.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default AdmissionsDashboard;
