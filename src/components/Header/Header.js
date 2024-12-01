import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference for the menu to handle clicks outside

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close the menu after navigation
  };

  const handleDropdownItemClick = (path) => {
    navigate(path);
    setMenuOpen(false); // Close the menu after navigation
  };

  // Close menu if clicked outside
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
      <Container>
        <div className="header-top">
          <Button className="signup-btn" onClick={() => handleNavigation("/Signup")}>
            Sign Up
          </Button>
          <Button className="signin-btn" onClick={() => handleNavigation("/Signin")}>
            Sign In
          </Button>
        </div>
        <div className="header-container">
          {/* Logo Section */}
          <Link to="/" className="logo-link">
            <img src={logo} alt="University Logo" className="header-logo" />
          </Link>
          <h1 className="header-title">UNIVERSITY ENROLLMENT MANAGEMENT SYSTEM</h1>
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
          <nav
            ref={menuRef}
            className={`header-nav ${isMenuOpen ? 'open' : ''}`}
          >
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" onClick={toggleMenu}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/About" onClick={toggleMenu}>
                AboutUs
              </Nav.Link>
            
              <Nav.Link as={Link} to="/contact" onClick={toggleMenu}>
                Contact Us
              </Nav.Link>
            </Nav>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
