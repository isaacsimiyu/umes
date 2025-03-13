import React, { useState } from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AboutUs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faGlobe,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section); 
  };
  return (
    <div>
      <Header />
      <main className="main">
        <section className="welcome-section">
          <div className="welcome">
            <h1>About University Enrollment Management System (UEMS)</h1>
            <p>Achieve the best from our web</p>
          </div>
        </section>

        <section className="vision-section">
          <Container>
            <Row>
              <Col md={3} sm={6} xs={12}>
                <div className="featured-container">
                  <FontAwesomeIcon icon={faBook} className="icon" />
                  <h3 onClick={() => handleSectionClick("vision")}>Our Vision</h3>
              {activeSection === "vision" && (
                  <ul>
                    <li>
                      The University Enrollment Management System (UEMS) is
                      designed to streamline the process of student enrollment,
                      course management, and application review for
                      universities. Our platform allows students to easily
                      apply for programs, check eligibility, and track the
                      status of their applications.
                    </li>
                  </ul>
                   )}
                </div>
              </Col>
           
              <Col md={3} sm={6} xs={12}>
                <div className="featured-container">
                  <FontAwesomeIcon icon={faGlobe} className="icon" />
                  <h3 onClick={() => handleSectionClick("mission")}>Our Mission</h3>
                  {activeSection === "mission" && (
                  <ul>
                    <li>
                      Our mission is to simplify and automate the enrollment
                      process for educational institutions while providing a
                      user-friendly experience for both students and staff.
                    </li>
                  </ul>
                   )}
                </div>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <div className="featured-container">
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                  <h3 onClick={() => handleSectionClick("values")}>Our Core Values</h3>
                  {activeSection === "values" && (
                  <ul>
                    <li>Integrity</li>
                    <li>Teamwork</li>
                    <li>Excellence</li>
                    <li>Accountability</li>
                    <li>Faithfulness to the Holy Scripture</li>
                  </ul>
                  )}
                </div>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <div className="featured-container">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  <h3 onClick={() => handleSectionClick("values")}>Our Objectives</h3>
                  {activeSection === "values" && (
                  <ul>
                    <li>
                      UEMS empowers administrators to manage courses, set
                      cut-off points, and oversee the enrollment process.
                    </li>
                    <li>
                      The Admissions Committee can review applications, make
                      decisions, and provide feedback to students through the
                      system.
                    </li>
                  </ul>
                   )}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
