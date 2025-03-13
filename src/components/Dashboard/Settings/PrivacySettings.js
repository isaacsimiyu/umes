import React, { useState } from 'react';


const PrivacySettings = () => {
  const [privacyOptions, setPrivacyOptions] = useState({
    profileVisibility: 'public', 
    dataSharing: false,
    searchEngineIndexing: true,
  });

  const handleChange = (key, value) => {
    setPrivacyOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const handleSave = () => {
    alert('Privacy settings saved successfully!');
    
  };

  return (
    <div className="privacy-settings">
      <h3>Privacy Settings</h3>
      <p>Adjust your privacy preferences below:</p>

      
      <div className="settings-item">
        <label htmlFor="profileVisibility">Profile Visibility:</label>
        <select
          id="profileVisibility"
          value={privacyOptions.profileVisibility}
          onChange={(e) => handleChange('profileVisibility', e.target.value)}
        >
          <option value="public">Public</option>
          <option value="friends-only">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>

     
      <div className="settings-item">
        <label htmlFor="dataSharing">Allow Data Sharing:</label>
        <input
          type="checkbox"
          id="dataSharing"
          checked={privacyOptions.dataSharing}
          onChange={(e) => handleChange('dataSharing', e.target.checked)}
        />
      </div>

      
      <div className="settings-item">
        <label htmlFor="searchEngineIndexing">Allow Search Engine Indexing:</label>
        <input
          type="checkbox"
          id="searchEngineIndexing"
          checked={privacyOptions.searchEngineIndexing}
          onChange={(e) => handleChange('searchEngineIndexing', e.target.checked)}
        />
      </div>

      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </div>
  );
};

export default PrivacySettings;
