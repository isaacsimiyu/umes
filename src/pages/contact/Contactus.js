import Footer from '../../components/Footer/Footer';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Thank you for contacting us! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <Header />
      <main className="main">
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
                required
              />
            </div>
            <button type="submit" className="button">Submit</button>
          </form>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default ContactUs;
