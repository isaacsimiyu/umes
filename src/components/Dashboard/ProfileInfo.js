import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileInfo.css";

const ProfileInfo = ({ userId }) => {
  const [certificate, setCertificate] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size should be under 5MB.");
      return;
    }
    setCertificate(file);
  };

  const handleUpload = async () => {
    if (!certificate) {
      toast.warning("Please select a certificate to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", certificate);

    setUploading(true);
    try {
      const response = await axios.post(
        `http://localhost:3500/api/users/${userId}/upload-certificate`,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to upload certificate");
      }

      toast.success("Certificate uploaded successfully!");
      setUploadedFilePath(response.data.filePath); // Store the file path for viewing
      setCertificate(null);
    } catch (err) {
      toast.error(`Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleView = () => {
    if (uploadedFilePath) {
      window.open(`http://localhost:3500${uploadedFilePath}`, "_blank");
    } else {
      toast.warning("No certificate available to view.");
    }
  };

  return (
    <div className="certificate-upload">
      <h2>Upload Certificate</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {certificate && <p>Selected File: {certificate.name}</p>}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? <CircularProgress size={20} /> : "Upload"}
      </button>

      {uploadedFilePath && (
        <div className="action-section">
          <p>Uploaded File: {uploadedFilePath.split("/").pop()}</p>
          <button onClick={handleView}>View Certificate</button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfileInfo;
