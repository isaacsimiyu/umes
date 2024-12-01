import React from 'react';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import AdmissionsDashboard from './AdmissionsDashboard';

const DashboardContent = ({ userRole }) => {
  if (userRole === 'student') return <StudentDashboard />;
  if (userRole === 'admin') return <AdminDashboard />;
  if (userRole === 'admissions') return <AdmissionsDashboard />;
  return null;
};

export default DashboardContent;
