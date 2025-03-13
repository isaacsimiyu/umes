import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import image4 from "../../assets/home/Web-development.jpg";

import image6 from "../../assets/home/graphicimg.jpg";

const Home = () => {
  const navigate = useNavigate(); 
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
  
    { src: image4, description: "web development"},
   
    { src: image6, description: "graphics"},
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images.length]);

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index) => {
    setActiveIndex(index);
  };

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
        <section className="slider-section">
          <div className="image-slider">
            {images.map((image, index) => (
              <div
                key={index}
                className={`image-slide ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <img src={image.src} alt={`Slide ${index + 1}`} />
                <div className="description">
                  <h2>{image.description}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button onClick={prevImage}>Previous</button>
            <button onClick={nextImage}>Next</button>
          </div>
          <div className="slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToImage(index)}
              ></button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
