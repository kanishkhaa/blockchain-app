import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import GetStarted from "./pages/getstarted";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* First, Show GetStarted Page */}
        <Route path="/" element={<GetStarted />} />

        {/* After GetStarted, show Home with Navbar by default */}
        <Route path="/home" element={<><Navbar /><Home /></>} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;