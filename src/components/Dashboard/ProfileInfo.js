import React, { useState } from 'react';
import userMockDetails from './userMockDetails'; // Import user mock data
import './ProfileInfo.css'; // Import CSS for styling

const ProfileInfo = () => {
  const {
    profilePicture,
    name,
    email,
    role,
    phone,
    address,
    dateOfBirth,
    enrolledSince,
  } = userMockDetails;

  // State to manage uploaded certificate
  const [certificate, setCertificate] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCertificate(file);
      setUploadStatus('');
    }
  };

  const handleUpload = () => {
    if (certificate) {
      // Simulate upload process
      setTimeout(() => {
        setUploadStatus('Certificate uploaded successfully!');
      }, 1000);
    } else {
      setUploadStatus('Please select a certificate to upload.');
    }
  };

  return (
    <div className="profile-info">
      <h1>Profile Information</h1>
      <div className="profile-container">
        {/* Profile Picture */}
        <img
          src={profilePicture}
          alt={`${name}'s Profile`}
          className="profile-picture"
        />

        {/* Profile Details */}
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dateOfBirth}
          </p>
          <p>
            <strong>Enrolled Since:</strong> {enrolledSince}
          </p>
        </div>
      </div>

      {/* Certificate Upload Section */}
      <div className="certificate-upload">
        <h2>Upload Certificate</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileChange}
        />
        {certificate && <p>Selected File: {certificate.name}</p>}
        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ProfileInfo;
