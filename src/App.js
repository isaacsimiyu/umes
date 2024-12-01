import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./config/Routes"; // Ensure this points to your routes configuration
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, children }, index) => (
          children ? (
            // Handle Nested Routes
            <Route key={index} path={path} element={element}>
              {children.map(({ path: childPath, element: childElement }, childIndex) => (
                <Route key={childIndex} path={childPath} element={childElement} />
              ))}
            </Route>
          ) : (
            // Top-Level Route
            <Route key={index} path={path} element={element} />
          )
        ))}
        {/* Default 404 Route */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
