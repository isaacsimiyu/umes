import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';


const AdminSidebar = ({ userRole }) => {
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
          <h2>UEMS Admin Dashboard</h2>
          <nav>
            

            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Addcourses
            </NavLink>
            <NavLink
              to="/admission-committee"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              admissioncommitee
            </NavLink>
            <NavLink
              to="/assign-courses"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              AssignCourses
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

export default AdminSidebar;
