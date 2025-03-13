import React, { useState, useEffect } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, message: 'You have to submit Courses before deadline approach!', read: false },
              { id: 2, message: 'Your profile was updated successfully.', read: true },
              { id: 3, message: 'Deadline for  Course Application is tomorrow.', read: false },
            ]),
          1000
        )
      );
      setNotifications(response);
    } catch (err) {
      setError('Failed to fetch notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

 
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notifications">
      <h1>Notifications</h1>

      
      {error && <p className="error">{error}</p>}

     
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <>
         
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={notification.read ? 'read' : 'unread'}
                >
                  <p>{notification.message}</p>
                  <div className="actions">
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </button>
                    )}
                    <button onClick={() => deleteNotification(notification.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No notifications available.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Notifications;
