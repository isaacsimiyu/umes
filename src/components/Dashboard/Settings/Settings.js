import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import './Settings.css';
import TopBar from '../TopBar';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
  <div>
    <TopBar/>
  
    <div className="settings">
      <div className="settings-sidebar">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
          aria-selected={activeTab === 'profile'}
        >
          Profile
        </button>
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
          aria-selected={activeTab === 'notifications'}
        >
          Notifications
        </button>
        <button
          className={activeTab === 'privacy' ? 'active' : ''}
          onClick={() => setActiveTab('privacy')}
          aria-selected={activeTab === 'privacy'}
        >
          Privacy
        </button>
      </div>
      <div className="settings-content">
        {renderContent()}
      </div>
      </div>
    </div>
  );
};

export default Settings;
