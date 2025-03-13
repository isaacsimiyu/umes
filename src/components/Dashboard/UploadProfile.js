import React, { useState } from 'react';
import './UploadProfile.css';

const UploadProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setUploadStatus('Only JPG and PNG images are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('File size must be less than 5MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadStatus('');
    }
  };

 
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file before uploading.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profileFile', selectedFile);

    try {
      const response = await fetch('http://localhost:3500/api/upload-profile', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('✅ File uploaded successfully!');
        setUploadedUrl(result.fileUrl); 
      } else {
        throw new Error(result.error || 'Failed to upload the file.');
      }
    } catch (error) {
      setUploadStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-profile">
      <h1>Upload Profile Picture</h1>

    
      <div className="profile-picture">
        {uploadedUrl ? (
          <img src={uploadedUrl} alt="Uploaded Profile" />
        ) : (
          <p>No profile picture uploaded yet.</p>
        )}
      </div>

      
      <form onSubmit={handleFileUpload}>
        <label htmlFor="fileInput" className="file-label">
          Choose a profile picture:
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />

       
        {previewUrl && (
          <div className="preview">
            <h3>Preview:</h3>
            <img src={previewUrl} alt="File Preview" className="preview-image" />
          </div>
        )}

        <button type="submit" className="upload-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default UploadProfile;
