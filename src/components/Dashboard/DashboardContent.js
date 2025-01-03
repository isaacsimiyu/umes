import React, { Suspense } from 'react';
const AccountInfo = React.lazy(() => import('./AccountInfo'))

const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
const AdmissionsDashboard = React.lazy(() => import('./AdmissionsDashboard'));

const DashboardContent = ({ userRole }) => {
  if (!userRole) return <p>Loading...</p>;

  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      {userRole === 'student' && <AccountInfo/>}
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'admissions' && <AdmissionsDashboard />}
      {!['student', 'admin', 'admissions'].includes(userRole) && (
        <p>Invalid role or unauthorized access.</p>
      )}
    </Suspense>
  );
};

export default DashboardContent;
