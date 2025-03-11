import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home";
import GetStarted from "./pages/getstarted";
import Navbar from "./components/navbar";

const App = () => {
  const [formData, setFormData] = useState({
    Year: "",
    WRI: "",
    Exposure: "",
    Vulnerability: "",
    Susceptibility: "",
    "Lack of Coping Capabilities": "",
    "Lack of Adaptive Capacities": "",
    CPI: "",
    Latitude: "",
    Longitude: "",
    "Reconstruction Costs ('000 US$)": "",
    "No Affected": "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/predict", formData);
      setPrediction(res.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

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

      <div className="container">
        <h1>Disaster Impact Prediction</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input type="text" name={key} value={formData[key]} onChange={handleChange} required />
            </div>
          ))}
          <button type="submit">Predict</button>
        </form>

        {prediction && (
          <div className="prediction-result">
            <h2>Predicted Impact:</h2>
            <p>Total Deaths: {prediction["Total Deaths"]}</p>
            <p>Total Damages ('000 US$): {prediction["Total Damages ('000 US$)"]}</p>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;