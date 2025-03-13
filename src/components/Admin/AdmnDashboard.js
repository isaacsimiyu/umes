import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import AdminDashboard from './AdminDashboard'

import './AdmnDashboard.css';

const Dashboard = ({ userRole }) => {
  return (
    <div className="dashboard">
      <AdminSidebar userRole={userRole} />
      <div className="main-content">
        <AdminTopBar />
        
       <AdminDashboard/>
      </div>
    </div>
  );
};

export default Dashboard;
