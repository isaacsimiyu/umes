import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      
      <div className="header-top">
        <Container className="top-bar">
        
          <div className="contact-info">
            <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:uemsinfo@gmail.com">uemsinfo@gmail.com</a>
            <FontAwesomeIcon icon={faPhone} /> <a href="tel:+254745323638">+254 745323638</a>
          </div>

          
          <div className="social-icons">
            <a href="https://facebook.com/Isaac Iso"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com/Isaacsimiyu2030"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://instagram.com/isaacsimiyu757"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://wa.me/254745323638"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href=""><FontAwesomeIcon icon={faYoutube} /></a>
          </div>

       
          <div className="header-signup">
            <Button className="signup-btn" onClick={() => handleNavigation("/Signup")}>Sign Up</Button>
            <Button className="signin-btn" onClick={() => handleNavigation("/Signin")}>Sign In</Button>
          </div>
        </Container>
      </div>

     
      <div className="header-main">
        <Container className="header-content">
         
          <Link to="/" className="logo-link">
            <img src={logo} alt="University Logo" className="header-logo" />
          </Link>

       
          <nav ref={menuRef} className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
            <Nav className="nav-links">
              <Nav.Link as={Link} to="/" onClick={() => setMenuOpen(false)}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about-us" onClick={() => setMenuOpen(false)}>About</Nav.Link>

              <Nav.Link as={Link} to="/contact" onClick={() => setMenuOpen(false)}>Contact</Nav.Link>
            </Nav>
          </nav>

         
          <button className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </Container>
      </div>
    </header>
  );
};

export default Header;
