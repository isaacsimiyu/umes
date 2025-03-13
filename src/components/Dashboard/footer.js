import React from 'react';
import './footer.css';

const footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
      
        <div className="footer-logo">
          <h2>Student Dashboard</h2>
          <p>
            Empowering students with the tools and resources to excel in their academic and professional journeys.
          </p>
        </div>

       
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/courses">Courses</a>
            </li>
            <li>
              <a href="/notifications">Notifications</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>

       
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

     
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Student Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default footer;
