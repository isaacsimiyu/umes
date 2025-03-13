import React, { useState } from 'react';

const UploadProfileModal = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        onUpload(base64Image); // Pass the base64 image to the parent component
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload Profile Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadProfileModal;
