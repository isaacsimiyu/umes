// src/pages/HOME/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Button, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WebDevelopmentImage from '../../assets/home/Web-development.jpg';
import NetworkingImage from '../../assets/home/networkimg.jpg';
import SystemImage from '../../assets/home/systemimg.jpg';
import databaseImage from '../../assets/home/database.jpg';
import './Home.css'; // Import the CSS file

const Program = ({ image, title, description }) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <Col sm={6} md={4} lg={3} className="program">
      <Image src={image} alt={title} fluid />
      <div className="program-description">
        <h4>{title}</h4>
        {isDescriptionVisible && <p>{description}</p>}
        <Button onClick={toggleDescription} variant="primary">
          {isDescriptionVisible ? 'Hide Description' : 'Read more'}
        </Button>
      </div>
    </Col>
  );
};

const Home = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="section">
          <h1>Welcome to the University Enrollment Management System</h1>
          <p>
            Manage your applications, review student enrollments, or oversee course management through our system.
          </p>
          <div className="buttons">
            <Link to="/register" className="button">
              Register
            </Link>
            <Link to="/" className="button">
              Login
            </Link>
          </div>
        </section>

        <section className="section-with-image">
          <div className="background-image"></div>
          <h1>Programs</h1>
        </section>

        <section className="programs">
          <Container>
            <Row>
              <Program
                image={WebDevelopmentImage}
                title="Web Development"
                description="Learn cutting-edge skills and participate in projects and events that enhance your learning journey."
              />
               <Program
                image={NetworkingImage}
                title="Networking"
                description="Learn cutting-edge skills and participate in projects and events that enhance your learning journey."
              />

             <Program
                image={NetworkingImage}
                title="Networking"
                description="Learn cutting-edge skills and participate in projects and events that enhance your learning journey."
              />
                <Program
                image={SystemImage}
                title="System"
                description="Learn cutting-edge skills and participate in projects and events that enhance your learning journey."
              />
               <Program
                image={databaseImage}
                title="System Database"
                description="Learn cutting-edge skills and participate in projects and events that enhance your learning journey."
              />
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
