import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ContactUs.css';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/api/contact', {
        email: form.email,
        message: form.message,
        name: form.name,
      });

      if (response.status === 200) {
        alert('Thank you for contacting us! Your message has been sent.');
        setForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      
      <main className="main">
      <div className="contact-email">
        <a href="mailto:isaacsimiyu757@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} /> Email
        </a>
        <a href="https://wa.me/254745323638">
          <FontAwesomeIcon icon={faPhone} /> WhatsApp
        </a>
      </div>
        <section className="section">
          <h1>Contact Us</h1>
          <p>If you have any questions, concerns, or need support, feel free to contact us using the form below.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message"
                required
              />
            </div>
            <button type="submit" className="button">Submit</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
