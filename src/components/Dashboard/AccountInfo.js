import React, { useState, useEffect } from "react"; 
import "./AccountInfo.css";
import Profile from "./Profile"; 
import Notifications from "./Notifications";
import Portfolio from "./Portfolio";

const StudentDashboard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [username, setUsername] = useState(""); // Default username set to empty
  const [loading, setLoading] = useState(true); // Show loading state while fetching data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          credentials: "include", // Ensures cookies (JWT) are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUsername(data.profile.username || "Student");
        localStorage.setItem("username", data.profile.username); // Store username in localStorage
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUserProfile();

    // Load profile image from localStorage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result;
        setProfileImage(uploadedImage);
        localStorage.setItem("profileImage", uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
  };

  const handleBackgroundClick = (event) => {
    if (!event.target.closest(".dashboard-links") && activeSection !== "dashboard") {
      setActiveSection("dashboard");
    }
  };

  // Function to get dynamic greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return <p>Loading...</p>; // Display while waiting for data
  }

  return (
    <div className="student-dashboard" onClick={handleBackgroundClick}>
      <header className="dashboard-header">
        <div className="header-content">
          <nav className="dashboard-links">
            <ul>
              <li className="profile-section">
                <label htmlFor="upload-profile" className="upload-label">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="profile-thumbnail"
                  />
                  <input
                    type="file"
                    id="upload-profile"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
                <div className="profile-buttons">
                  <button
                    className="upload-button"
                    onClick={() =>
                      document.getElementById("upload-profile").click()
                    }
                  >
                    Upload Image
                  </button>
                  {profileImage && (
                    <button
                      className="remove-button"
                      onClick={handleRemoveImage}
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </li>
              <li>
                <button
                  className="dashboard-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection("profile");
                  }}
                >
                  Your Profile
                </button>
              </li>
              <li>
                <button
                  className="dashboard-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection("portfolio");
                  }}
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  className="dashboard-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection("notifications");
                  }}
                >
                  Notifications
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h1>
              {getGreeting()}, {username}!
            </h1>
            <p>
              Welcome to your Student Dashboard, {username}! Your one-stop platform for managing your academic journey, accessing resources, and staying updated with the latest notifications and announcements.
            </p>
          </div>
        </div>
      </header>

      {/* Conditional Rendering for Active Section */}
      <main className="dashboard-content">
        {activeSection === "dashboard" && (
          <section className="dashboard-info">
            <h2>About the Student Dashboard</h2>
            <p>
              The Student Dashboard is designed to simplify and enhance your
              educational experience. It provides a centralized platform for
              students to:
            </p>
            <ul>
              <li>Track academic progress and enrollment status.</li>
              <li>Upload and manage certificates and documents.</li>
              <li>Receive real-time notifications and updates.</li>
              <li>Access personalized resources and enrolled courses.</li>
              <li>
                Explore new learning opportunities, including vocational
                training and practical skill-based programs.
              </li>
            </ul>
          </section>
        )}

        {activeSection === "profile" && <Profile />} 
        {activeSection === "notifications" && <Notifications />}
        {activeSection === "portfolio" && <Portfolio />}
      </main>
    </div>
  );
};

export default StudentDashboard;
