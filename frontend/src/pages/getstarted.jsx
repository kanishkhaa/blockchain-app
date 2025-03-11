import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/welcome.jpeg";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Starting navigation to home page");
    navigate("/home");
  };

  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(1.5)',
    display: 'flex',                 // ✅ Enables Flexbox
    flexDirection: 'column',         // ✅ Aligns elements in column
    alignItems: 'center',            // ✅ Centers horizontally
    justifyContent: 'center',        // ✅ Centers vertically
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-4xl font-bold mb-4 text-white">
        AI-Powered Climate Disaster Impact Prediction
      </h1>
      <p className="mb-6 text-lg text-white">
        Stay ahead of climate risks! Our AI-driven model predicts disaster impact, 
        assesses vulnerability, and provides actionable insights to enhance preparedness and resilience.
      </p>
      <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-full 
                   hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg 
                   flex items-center justify-center gap-2"
      >
        <span>Get Started</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Welcome;
