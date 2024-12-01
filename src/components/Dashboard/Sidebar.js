import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(true); // Manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
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
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/applications" activeClassName="active">
              Applications
            </NavLink>
            {userRole === 'admin' && (
              <NavLink to="/manage-programs" activeClassName="active">
                Manage Programs
              </NavLink>
            )}
            {userRole === 'student' && (
              <NavLink to="/progress" activeClassName="active">
                Progress Tracker
              </NavLink>
            )}
            <NavLink to="/notifications" activeClassName="active">
              Notifications
            </NavLink>
            <NavLink to="/reports" activeClassName="active">
              Reports
            </NavLink>
            <NavLink to="/settings" activeClassName="active">
              Settings
            </NavLink>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
