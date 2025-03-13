import React, { useState } from 'react';


const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleToggle = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <div className="notification-settings">
      <h3>Notification Settings</h3>
      <p>Manage your notification preferences below:</p>
      <div className="settings-item">
        <label htmlFor="emailNotifications">Email Notifications</label>
        <input
          type="checkbox"
          id="emailNotifications"
          checked={settings.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        />
      </div>
      <div className="settings-item">
        <label htmlFor="smsNotifications">SMS Notifications</label>
        <input
          type="checkbox"
          id="smsNotifications"
          checked={settings.smsNotifications}
          onChange={() => handleToggle('smsNotifications')}
        />
      </div>
      <div className="settings-item">
        <label htmlFor="pushNotifications">Push Notifications</label>
        <input
          type="checkbox"
          id="pushNotifications"
          checked={settings.pushNotifications}
          onChange={() => handleToggle('pushNotifications')}
        />
      </div>
      <button
        onClick={() => alert('Notification settings saved!')}
        className="save-button"
      >
        Save Changes
      </button>
    </div>
  );
};

export default NotificationSettings;
