import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ courses = [], universities = [] }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      // Safely filter courses and universities based on the query
      const filteredCourses = (courses || []).filter((course) =>
        course.name.toLowerCase().includes(query)
      );
      const filteredUniversities = (universities || []).filter((university) =>
        university.name.toLowerCase().includes(query)
      );

      // Combine results
      setSearchResults([...filteredCourses, ...filteredUniversities]);
    } else {
      setSearchResults([]); // Clear results if query is empty
    }
  };

  const handleLogout = () => {
    // Example logout logic
    console.log('User logged out');
    navigate('/Signin'); // Redirect to login
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
        <button className="notification-icon">🔔</button>
        <button className="profile-icon">👤</button>
        <button className="logout-icon" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default TopBar;
