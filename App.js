import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

// PrivateRoute Component to Protect Routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if user is authenticated
  return token ? element : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

        {/* Fallback Route for Undefined Paths */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
