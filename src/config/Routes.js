import React from "react";
import Home from "../pages/HOME/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contact/Contactus";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";
import ForgotPassword from "../components/forgot-password/ForgotPassword";
import ResetPassword from "../components/reset-password/ResetPassword";
import Dashboard from "../components/Dashboard/Dashboard";
import CourseApply from "../components/Dashboard/CourseApply";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import StudentDashboard from "../components/Dashboard/StudentDashboard";

import PrivateRoute from "../components/PrivateRoute"; 
import footer from "../components/Dashboard/footer"
import CourseApplicationForm from "../components/Dashboard/CourseApplicationForm";
import { element } from "prop-types";


export const routes = [
  {
    path: "/",
    element: <Home />,
    isPrivate: false, 
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
    isPrivate: false, 
  },
  {
    path: "/contact",
    element: <ContactUs />,
    isPrivate: false, 
  },
  {
    path: "/signin",
    element: <Signin />,
    isPrivate: false, 
  },
  {
    path: "/signup",
    element: <Signup />,
    isPrivate: false, 
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    isPrivate: false, 
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    isPrivate: false, 
  },
 
  {
    path: "dashboard-content",
    element: (<PrivateRoute>
      <StudentDashboard/>
    </PrivateRoute>),
    isPrivate: true,
  },
  {
    path: "/course-apply",
    element: (
      <PrivateRoute>
        <CourseApply />
      </PrivateRoute>
    ),
    isPrivate: true, 
  },
  
  {
    path: "/footer",
    element: (
    <PrivateRoute>
      <footer/>
    </PrivateRoute>
    ),
    isPrivate: true,
  },
  {
    path: "CourseApplicationForm",
    element: (<PrivateRoute>
      <CourseApplicationForm/>
    </PrivateRoute>
  ),
  isPrivate: true,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {localStorage.getItem("role") === "admin" ? (
          <AdminDashboard />
        ) : (
          <Dashboard userRole={localStorage.getItem("role") || "student"} />
        )}
      </PrivateRoute>
    ),
    isPrivate: true, 
  },
];
