import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const UniversityManager = () => {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/api/universities');
      setUniversities(response.data.universities);
    } catch (err) {
      toast.error('Failed to load universities');
    }
  };

  const addUniversity = async () => {
    try {
      await axios.post('http://localhost:3500/api/universities', { name, location });
      toast.success('University added');
      fetchUniversities();
    } catch (err) {
      toast.error('Failed to add university');
    }
  };

  const deleteUniversity = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/api/universities/${id}`);
      toast.success('University deleted');
      fetchUniversities();
    } catch (err) {
      toast.error('Failed to delete university');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>University Manager</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={addUniversity}>Add University</button>
      <ul>
        {universities.map((uni) => (
          <li key={uni.id}>
            {uni.name} - {uni.location}
            <button onClick={() => deleteUniversity(uni.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityManager;
