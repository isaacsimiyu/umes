import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop /> {/* Ensure this is outside Routes */}
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default Layout;
