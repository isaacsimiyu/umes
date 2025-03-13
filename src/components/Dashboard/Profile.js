import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch profile data
  const loadProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:3500/profile', { withCredentials: true });
      console.log(response.data);

      if (response.data?.profile) {
        setProfile(response.data.profile);
      } else {
        setError(response.data?.msg || 'No profile data found.');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile(); // Auto-fetch profile when component mounts
  }, []);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {loading && <p className="loading-message">Loading your profile...</p>}
      {error && <p className="error-message">{error}</p>}

      {profile && (
        <div className="profile-card">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Student ID:</strong> {profile.student_id}</p>
        </div>
      )}

      {!profile && !loading && (
        <button onClick={loadProfile} className="load-profile-button">
          Load Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
