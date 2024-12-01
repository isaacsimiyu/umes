import React from 'react';
import Header from '../../components/Header/Header';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="section">
          <h1>About University Enrollment Management System (UEMS)</h1>
          <p>
            The University Enrollment Management System (UEMS) is designed to streamline the process of student
            enrollment, course management, and application review for universities. Our platform allows students to
            easily apply for programs, check eligibility, and track the status of their applications.
          </p>
          <p>
            UEMS also empowers administrators to manage courses, set cut-off points, and oversee the enrollment
            process. The Admissions Committee can review applications, make decisions, and provide feedback to students
            through the system.
          </p>
          <p>
            Our mission is to simplify and automate the enrollment process for educational institutions while providing
            a user-friendly experience for both students and staff.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
