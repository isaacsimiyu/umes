import React, { useState } from 'react';
import axios from 'axios'; 
import './UploadProfile.css';

const UploadProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : '');
    }
  };

 
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    setIsUploading(true); 
    const formData = new FormData();
    formData.append('profileFile', selectedFile);

    try {
      const response = await axios.post('/api/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setUploadStatus('File uploaded successfully!');
      } else {
        throw new Error('Failed to upload the file.');
      }
    } catch (error) {
      setUploadStatus(`Error uploading file: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="upload-profile">
      <h1>Upload Profile</h1>

      <form onSubmit={handleFileUpload}>
        <label htmlFor="fileInput" className="file-label">
          Choose a profile picture or document:
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          aria-label="Choose a file to upload"
        />

        {previewUrl && (
          <div className="preview">
            <h3>Preview:</h3>
            <img src={previewUrl} alt="File Preview" className="preview-image" />
          </div>
        )}

        <button type="submit" className="upload-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default UploadProfile;
