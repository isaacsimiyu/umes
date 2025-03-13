import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopBar = ({ courses = [], universities = [], userId = "12345" }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedCertificate = localStorage.getItem("uploadedCertificate");
    if (savedCertificate) {
      setCertificateUrl(savedCertificate);
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filteredCourses = (courses || []).map((course) =>
        course.name.toLowerCase().includes(query) || String(course.id) === query
          ? { ...course, type: "course" }
          : null
      );

      const filteredUniversities = (universities || []).map((university) =>
        university.name.toLowerCase().includes(query) || String(university.id) === query
          ? { ...university, type: "university" }
          : null
      );

      setSearchResults([...filteredCourses, ...filteredUniversities].filter((item) => item));
    } else {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out");
      navigate("/Signin");
    }
  };

 
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be under 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", file);

    try {
      const response = await axios.post(
        `http://localhost:3500/api/users/${userId}/upload-certificate`,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to upload certificate");
      }

      alert("Certificate uploaded successfully!");
      setCertificateUrl(response.data.filePath);  
      localStorage.setItem("uploadedCertificate", response.data.filePath);
    } catch (err) {
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleRemoveCertificate = () => {
    localStorage.removeItem("uploadedCertificate");
    setCertificateUrl(null);
  };

  return (
    <header className="top-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses or universities by name or ID..."
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
                    {item.type === "course" ? (
                      <span>📘 Course: {item.name} (ID: {item.id})</span>
                    ) : (
                      <span>🎓 University: {item.name} (ID: {item.id})</span>
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
        <button className="course-icon" title="Courses">
          <a href="/courses">Courses 📘🎓</a>
        </button>
        <button className="notification-icon" title="Notifications">
          <a href="/notification">Notifications 🔔</a>
        </button>

       
        <button className="ProfileInfo-" title="Upload Certificate" onClick={handleUploadClick}>
          Upload Certificate 👤
        </button>
        
       
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {certificateUrl && (
          <div className="uploaded-certificate">
            <a
              href={`http://localhost:3500${certificateUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View Certificate"
            >
              📄 View Certificate
            </a>
            <button onClick={handleRemoveCertificate} className="remove-btn">
              ❌ Remove
            </button>
          </div>
        )}

        <button className="logout-icon" onClick={handleLogout} title="Log Out">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default TopBar;
