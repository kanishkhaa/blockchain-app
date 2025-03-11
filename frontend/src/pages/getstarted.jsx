import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/welcome.jpeg";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Added loading state or tracking functionality could go here
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
    animation: 'moveBackground 10s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">
          Next-Gen AI-Powered Perpetuals Trading DApp
        </h1>
        <p className="mb-6 text-lg">
          Trade with confidence! Our cutting-edge AI dynamically hedges positions, auto-adjusts leverage, and deploys real-time liquidation prevention strategies—maximizing profits while minimizing risks.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Welcome;