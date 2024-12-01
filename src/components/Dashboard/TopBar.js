import React from 'react';

const TopBar = () => {
  return (
    <header className="top-bar">
      <input type="text" placeholder="Search..." />
      <div className="icons">
        <button className="notification-icon">🔔</button>
        <button className="profile-icon">👤</button>
      </div>
    </header>
  );
};

export default TopBar;
