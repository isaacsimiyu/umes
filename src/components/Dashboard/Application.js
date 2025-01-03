import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Application = () => {
  
  const [appliedCourses, setAppliedCourses] = useState([]);

  const applyForCourse = (course) => {
    if (appliedCourses.length < 3 && !appliedCourses.includes(course)) {
      setAppliedCourses([...appliedCourses, course]);
    } else if (appliedCourses.includes(course)) {
      alert('You have already applied for this course.');
    } else {
      alert('You can only apply for up to 3 courses.');
    }
  };

  const removeCourse = (course) => {
    setAppliedCourses(appliedCourses.filter((c) => c !== course));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <StudentDashboard
              appliedCourses={appliedCourses}
              applyForCourse={applyForCourse}
              removeCourse={removeCourse}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default Application;
