import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

import AccountInfo from './AccountInfo';
import './Dashboard.css';

const Dashboard = ({ userRole }) => {
  return (
    <div className="dashboard">
      <Sidebar userRole={userRole} />
      <div className="main-content">
        <TopBar />
        <AccountInfo />  
       
      </div>
    </div>
  );
};

export default Dashboard;
