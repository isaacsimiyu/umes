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
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-controls="sidebar-navigation"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      {isOpen && (
        <aside className="sidebar" id="sidebar-navigation">
          <h2>UEMS Dashboard</h2>
          <nav>
            <NavDropdown
              title="Home"
              id="basic-dropdown"
              align="end"
              className="left-align-dropdown"
            >
              <NavDropdown.Item onClick={() => handleNavigation('')}>
               
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink
              to="/course-apply"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              CourseApply
            </NavLink>
            <NavLink
              to="/student-applications"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
            StudentApplications process
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
                to="/ProgressTracker"
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
              to="/settings"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Settings
            </NavLink>
            <NavLink
              to="/ChatDashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              ChatDashboard
            </NavLink>
            <NavLink
              to="/enrollment process"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              enrollment
            </NavLink>

           
           
          </nav>
          
        </aside>
      )}
    </div>
    /* <a
     href="/enrollment process"
     target="_blank"
     rel="noopener noreferrer"
     className="external-link"
   >
     Progress Tracker on the Web
   </a>*/
  );
};

export default Sidebar;
