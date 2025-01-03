import React from 'react';
import './AccountInfo.css';



const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to the Student Dashboard</h1>
        <p>
          Your one-stop platform for managing your academic journey, accessing resources, 
          and staying updated with the latest notifications and announcements.
        </p>
      </header>

      <section className="dashboard-info">
        <h2>About the Student Dashboard</h2>
        <p>
          The Student Dashboard is designed to simplify and enhance your educational experience. 
          It provides a centralized platform for students to:
        </p>
        <ul>
          <li>Track their academic progress and enrollment status.</li>
          <li>Upload and manage certificates and documents.</li>
          <li>Receive real-time notifications and updates.</li>
          <li>Access personalized resources and enrolled courses.</li>
          <li>Explore new learning opportunities, including vocational training and practical skill-based programs.</li>
        </ul>
      </section>
     
    </div>
  );
};

export default StudentDashboard;
