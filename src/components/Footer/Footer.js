import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          <Col md={4} className="footer-section">
            <h5>About Us</h5>
            <p>
              University Enrollment Management System (UEMS) offers a modern, efficient, and competency-based approach for university admissions.
            </p>
          </Col>
          <Col md={4} className="footer-section">
  <h5>Quick Links</h5>
  <ul className="footer-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about-us">About</Link></li>
    <li><Link to="/AboutUs">Services</Link></li>
    <li><Link to="/contact">Contact Us</Link></li>
  </ul>
</Col>
          <Col md={4} className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com/Isaac Iso" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/Isaacsimiyu2030" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://linkedin.com/in/isaac-simiyu-736847301" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://instagram.com/isaacsimiyu757" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col>
            <p>&copy; {new Date().getFullYear()} University Enrollment Management System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
