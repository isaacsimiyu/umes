import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', link: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load portfolio items (simulate API call)
  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      const response = await new Promise((resolve) =>
        setTimeout(() =>
          resolve(JSON.parse(localStorage.getItem('portfolio')) || []), 1000
        )
      );
      setPortfolioItems(response);
    } catch (err) {
      setError('Failed to load portfolio items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  // Add new portfolio item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.description || !newItem.link) {
      alert('Please fill in all fields.');
      return;
    }

    const addedItem = { id: Date.now(), ...newItem };
    const updatedPortfolio = [...portfolioItems, addedItem];

    setPortfolioItems(updatedPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    setNewItem({ title: '', description: '', link: '' }); 
  };

  // Delete a portfolio item
  const handleDeleteItem = (id) => {
    const updatedPortfolio = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updatedPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  };

  return (
    <div className="portfolio">
      <h1>Student Portfolio</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading portfolio items...</p>
      ) : (
        <>
          {/* Form to add new portfolio item */}
          <section className="add-portfolio-item">
            <h2>Add New Portfolio Item</h2>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
              ></textarea>
              <input
                type="url"
                placeholder="Project Link (e.g., https://yourproject.com)"
                value={newItem.link}
                onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                required
              />
              <button type="submit">Add Item</button>
            </form>
          </section>

          {/* Display the student's portfolio items */}
          <section className="portfolio-items">
            <h2>Your Portfolio</h2>
            {portfolioItems.length > 0 ? (
              <ul>
                {portfolioItems.map((item) => (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in your portfolio. Add some to get started!</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Portfolio;
