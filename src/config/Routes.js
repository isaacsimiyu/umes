import React from "react";
import Home from "../pages/HOME/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/contact/Contactus";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";
import ForgotPassword from "../components/forgot-password/ForgotPassword";
import ResetPassword from "../components/reset-password/ResetPassword";
import Dashboard from "../components/Dashboard/Dashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import PrivateRoute from "../components/PrivateRoute";

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
