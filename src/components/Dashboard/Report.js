import React, { useState, useEffect } from 'react';
import { fetchReports, downloadReport } from '../api'; // Import API functions
import './Report.css'; // Import styles

const Report = ({ studentId, userRole }) => {
  const [reports, setReports] = useState([]); // List of reports
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await fetchReports(studentId, userRole); // Fetch reports
        setReports(data);
      } catch (err) {
        setError('Failed to load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [studentId, userRole]);

  const handleDownload = async (reportId) => {
    try {
      await downloadReport(reportId); // Download the report
      alert('Report downloaded successfully!');
    } catch (err) {
      alert('Failed to download the report. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (reports.length === 0) {
    return <p>No reports available.</p>;
  }

  return (
    <div className="report-container">
      <h1>{userRole === 'admin' ? 'All Reports' : 'Your Reports'}</h1>
      <ul className="report-list">
        {reports.map((report) => (
          <li key={report.id} className="report-item">
            <div className="report-details">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDownload(report.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
