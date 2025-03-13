import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children, requiredRole }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || !role) {
          setAuth({ isAuthenticated: false, role: null });
        } else {
         
          setAuth({ isAuthenticated: true, role });
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setAuth({ isAuthenticated: false, role: null });
      }
      setLoading(false);
    };

    validateAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    toast.error('You must log in to access this page.');
    return requiredRole === 'admin' ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/signin" replace />
    );
  }

  if (requiredRole && auth.role !== requiredRole) {
    toast.error('You are not authorized to view this page.');
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default PrivateRoute;
