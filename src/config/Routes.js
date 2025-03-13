import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HOME/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contact/Contactus";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";
import ForgotPassword from "../components/forgot-password/ForgotPassword";
import ResetPassword from "../components/reset-password/ResetPassword";
import Dashboard from "../components/Dashboard/Dashboard";
import CourseApply from "../components/Dashboard/CourseApply";
import Courses from "../components/Dashboard/Courses"
import StudentApplications from "../components/Dashboard/StudentApplications";
import StudentDashboard from "../components/Dashboard/StudentDashboard";
import ProgressTracker from "../components/Dashboard/ProgressTracker";
import PrivateRoute from "../components/PrivateRoute"; 
import ProfileInfo from "../components/Dashboard/ProfileInfo";
import AdmnDashboard from "../components/Admin/AdmnDashboard";
import CourseApplicationForm from "../components/Dashboard/CourseApplicationForm";
import Report from "../components/Dashboard/Report";
import Settings from "../components/Dashboard/Settings/Settings";
import AdmissionsDashboard from "../components/Admin/AdmissionsDashboard";
import EnrollmentProcess from "../components/Dashboard/EnrollmentProcess";
import Profile from "../components/Dashboard/Profile";
import Portfolio from "../components/Dashboard/Portfolio";
import Notifications from "../components/Dashboard/Notifications";
import UploadProfile from "../components/Dashboard/UploadProfile";
import AssignCourses from "../components/Admin/AssignCourses";
import ScrollToTop from "../components/ScrollToTop";

import ChatDashboard from "../components/Dashboard/ChatDashboard";



// Route definitions
export const routes = [
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/about-us", element: <AboutUs />, isPrivate: false },
 
  { path: "/contact", element: <ContactUs />, isPrivate: false },
  { path: "/signin", element: <Signin />, isPrivate: false },
  { path: "/signup", element: <Signup />, isPrivate: false },
  { path: "/forgot-password", element: <ForgotPassword />, isPrivate: false },
  { path: "/reset-password", element: <ResetPassword />, isPrivate: false },

  { 
    path: "/dashboard-content", 
    element: <PrivateRoute><StudentDashboard /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/course-apply", 
    element: <PrivateRoute><CourseApply /></PrivateRoute>, 
    isPrivate: true 
  },
  { 
    path: "/courses", 
    element: <PrivateRoute><Courses /></PrivateRoute>, 
    isPrivate: true 
  },

  

  { 
    path: "/course-application-form", 
    element: <PrivateRoute><CourseApplicationForm /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/progress-tracker", 
    element: <PrivateRoute><ProgressTracker /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/profile-info", 
    element: <PrivateRoute><ProfileInfo /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/portfolio", 
    element: <PrivateRoute><Portfolio /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/notifications", 
    element: <PrivateRoute><Notifications /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/upload-profile", 
    element: <PrivateRoute><UploadProfile /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/reports", 
    element: <PrivateRoute><Report /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/settings", 
    element: <PrivateRoute><Settings /></PrivateRoute>, 
    isPrivate: true 
  },
  { 
    path: "/ChatDashboard", 
    element: <PrivateRoute><ChatDashboard /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/profile", 
    element: <PrivateRoute><Profile /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/enrollment-process", 
    element: <PrivateRoute><EnrollmentProcess /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/student-applications", 
    element: <PrivateRoute><StudentApplications /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/dashboard", 
    element: (
      <PrivateRoute allowedRoles={["admin", "user"]}>
        <Dashboard userRole={localStorage.getItem("role") || "user"} />
      </PrivateRoute>
    ), 
    isPrivate: true 
  },
  { 
    path: "/admin", 
    element: (
      <PrivateRoute allowedRoles={["admin", "user"]}>
        <AdmnDashboard userRole={localStorage.getItem("role") || "user"} />
      </PrivateRoute>
    ), 
    isPrivate: true 
  },

 

  { 
    path: "/admission-committee", 
    element: <PrivateRoute><AdmissionsDashboard /></PrivateRoute>, 
    isPrivate: true 
  },

  { 
    path: "/assign-courses", 
    element: <PrivateRoute><AssignCourses /></PrivateRoute>, 
    isPrivate: true 
  },

 
];

// Main App Routing Component
const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
