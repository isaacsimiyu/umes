import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';


const Sidebar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(true); 
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      {isOpen && (
        <aside className="sidebar">
          <h2>UEMS Dashboard</h2>
          <nav>
           
            <NavDropdown
              title="Home"
              id="basic-dropdown"
              align="end"
              className="left-align-dropdown"
            >
              <NavDropdown.Item
                onClick={() => handleNavigation('/student-dashboard')}
              >
                Account Info
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleNavigation('/profile')}
              >
                 Profile Info
              </NavDropdown.Item>

            </NavDropdown>

            
            <NavLink
              to="/course-apply"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Applications
            </NavLink>
            <NavLink
              to="/CourseApplicationForm"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Applicationform
            </NavLink>

            {userRole === 'admin' && (
              <NavLink
                to="/manage-programs"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Manage Programs
              </NavLink>
            )}
            {userRole === 'student' && (
              <NavLink
                to="/progress"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Progress Tracker
              </NavLink>
            )}
 <NavLink
              to="/dashboard-content"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Status
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Notifications
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Reports
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Settings
            </NavLink>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
