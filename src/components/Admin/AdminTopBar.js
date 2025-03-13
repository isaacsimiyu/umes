import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminTopBar = ({ courses = [], universities = [] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filteredCourses = (courses || []).map((course) =>
        course.name.toLowerCase().includes(query) ? { ...course, type: 'course' } : null
      );
      const filteredUniversities = (universities || []).map((university) =>
        university.name.toLowerCase().includes(query) ? { ...university, type: 'university' } : null
      );

     
      setSearchResults([...filteredCourses, ...filteredUniversities].filter((item) => item));
    } else {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('User logged out');
      navigate('/Signin'); 
    }
  };

  return (
    <header className="top-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses or universities..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && <button onClick={handleClearSearch} className="clear-search">✖</button>}
        {searchQuery && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((item, index) => (
                  <li key={index}>
                    {item.type === 'course' ? (
                      <span>📘 Course: {item.name}</span>
                    ) : (
                      <span>🎓 University: {item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
      <div className="icons">
        <button className="notification-icon" title="Notifications">🔔</button>
        <button className="profile-icon" title="Profile">👤</button>
        <button className="logout-icon" onClick={handleLogout} title="Log Out">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default AdminTopBar;
