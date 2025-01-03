
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.css';
import Footer from '../../components/Footer/Footer';

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
            <Link to="/Signup" className="button">
              Register
            </Link>
            <Link to="/Signin" className="button">
              Login
            </Link>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
    
  );
};

export default Home;
