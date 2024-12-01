import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardContent from './DashboardContent';
import './Dashboard.css';

const Dashboard = ({ userRole }) => {
  return (
    <div className="dashboard">
      <Sidebar userRole={userRole} />
      <div className="main-content">
        <TopBar />
        <DashboardContent userRole={userRole} />
      </div>
    </div>
  );
};

export default Dashboard;
