import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import Search from '../components/search';
import Map from './map';

const DataSourcePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full relative">
        {/* Back and close buttons */}
        <div className="flex justify-between mb-6">
          <button onClick={onClose} className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 className="text-white text-xl font-bold">Data Sources</h2>
          <button onClick={onClose} className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Data source icons */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-64 h-64 mb-8">
            {/* Center blue icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-blue-600 rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
                <div className="text-white text-2xl">🌍</div>
              </div>
            </div>
            
            {/* Top left icon (NOAA) */}
            <div className="absolute top-0 left-0">
              <div className="bg-white rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                <div className="text-blue-600 text-sm font-bold">NOAA</div>
              </div>
            </div>
            
            {/* Top right icon (NASA) */}
            <div className="absolute top-0 right-0">
              <div className="bg-white rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                <div className="text-blue-500 text-sm font-bold">NASA</div>
              </div>
            </div>
            
            {/* Bottom left icon (UNEP) */}
            <div className="absolute bottom-0 left-0">
              <div className="bg-white rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                <div className="text-green-500 text-sm font-bold">UNEP</div>
              </div>
            </div>
            
            {/* Bottom right icon (WMO) */}
            <div className="absolute bottom-0 right-0">
              <div className="bg-teal-500 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg text-white text-sm font-bold">
                WMO
              </div>
            </div>
            
            {/* Curved lines connecting icons */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <path d="M100,100 C80,70 50,80 30,30" stroke="#333" fill="none" strokeWidth="1" />
              <path d="M100,100 C120,70 150,80 170,30" stroke="#333" fill="none" strokeWidth="1" />
              <path d="M100,100 C80,130 50,120 30,170" stroke="#333" fill="none" strokeWidth="1" />
              <path d="M100,100 C120,130 150,120 170,170" stroke="#333" fill="none" strokeWidth="1" />
            </svg>
          </div>
          
          <h2 className="text-white text-2xl font-bold mb-4">Access Global Climate Data</h2>
          <p className="text-white text-center mb-8">
            Our platform integrates with leading climate data providers to give you the most accurate and comprehensive information for your risk assessments.
          </p>
          
          <button 
            onClick={() => window.open('https://data.noaa.gov/onestop/collections/details/666b9db2-e598-4d5a-9240-c4c10fc3c7a6', '_blank')}
            className="bg-white text-gray-900 w-full py-4 px-6 rounded-full font-bold flex items-center justify-between"
          >
            Explore Available Data Sources
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ConnectDataButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Check for connected data sources
  useEffect(() => {
    checkForDataConnection();
    
    // Also check when window gets focus
    window.addEventListener('focus', checkForDataConnection);
    return () => window.removeEventListener('focus', checkForDataConnection);
  }, []);
  
  // Function to check for data connections
  const checkForDataConnection = () => {
    // This would actually check for API connections or loaded datasets
    const hasConnection = localStorage.getItem('climateDataConnected') === 'true';
    setIsConnected(hasConnection);
  };
  
  const handleConnect = () => {
    if (isConnected) {
      setShowOptions(true);
    } else {
      setShowPopup(true);
    }
  };
  
  const connectToData = async () => {
    console.log("Connecting to data sources");
    
    try {
      // Simulate connecting to data sources
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('climateDataConnected', 'true');
      setIsConnected(true);
      
      // Close the options menu
      setShowOptions(false);
      
      alert("Successfully connected to climate data sources");
    } catch (error) {
      console.error("Error connecting to data sources:", error);
      alert("Failed to connect to data sources. Please try again.");
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showOptions) return;
    
    const handleClickOutside = (event) => {
      if (!event.target.closest('.data-dropdown') && !event.target.closest('.data-button')) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);
  
  return (
    <div className="relative">
      <button 
        className="data-button bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-4 rounded-lg mr-4"
        onClick={handleConnect}
      >
        {isConnected ? "Manage Data Sources" : "Connect Data Sources"}
      </button>
      
      {/* Options dropdown if user has connected data */}
      {showOptions && (
        <div className="data-dropdown absolute top-full mt-2 right-0 bg-gray-800 rounded-lg shadow-lg p-2 z-40 w-48">
          <button 
            onClick={connectToData}
            className="text-white hover:bg-gray-700 rounded px-4 py-2 w-full text-left"
          >
            Refresh Connections
          </button>
          <button 
            onClick={() => {
              setShowOptions(false);
              setShowPopup(true);
            }}
            className="text-white hover:bg-gray-700 rounded px-4 py-2 w-full text-left"
          >
            Add New Data Source
          </button>
        </div>
      )}
      
      {/* Data sources popup */}
      {showPopup && <DataSourcePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

// Prediction Form Component
const PredictionForm = () => {
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
  const [showForm, setShowForm] = useState(false);

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
      alert("Error fetching prediction. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Disaster Impact Prediction</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg"
        >
          {showForm ? "Hide Form" : "Make Prediction"}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-gray-400 mb-1 text-sm">{key}</label>
                <input 
                  type="text" 
                  name={key} 
                  value={formData[key]} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-black" 
                  required 
                />
              </div>
            ))}
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded-lg"
          >
            Predict Impact
          </button>
        </form>
      )}
      
      {prediction && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-white">Prediction Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-400">
                {prediction["Total Deaths"]}
              </div>
              <div className="text-sm text-gray-400">Predicted Total Deaths</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">
                ${prediction["Total Damages ('000 US$)"]}k
              </div>
              <div className="text-sm text-gray-400">Predicted Total Damages ('000 US$)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate(); 
  const [rotation, setRotation] = useState(0);
  const [aiStatus, setAiStatus] = useState(false);
  
  // Animation for the icon semicircle
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleAiPrediction = async () => {
    try {
      const response = await fetch('/toggle_ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: aiStatus ? 'off' : 'on' })
      });
      
      const data = await response.json();
      if (response.ok) {
        setAiStatus(!aiStatus);
        alert(data.message || "AI prediction mode toggled successfully");
      } else {
        alert('Failed to toggle AI prediction mode');
      }
    } catch (error) {
      console.error('Error toggling AI:', error);
      alert('Error communicating with AI prediction system');
    }
  };
  
  const handleStartAssessment = () => {
    navigate('/assessment'); // Navigate to assessment page
  };

  return (
    <div className="w-screen h-screen flex bg-black text-white overflow-hidden">

      <div className="w-70 bg-gray-900 h-full">
        <Navbar />
      </div>
      
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-7 mt-1 flex items-center justify-end">
           {/* AI Prediction Toggle */}
           <div className="flex items-center mr-4">
            <span className="mr-3 text-sm text-gray-300">AI Prediction</span>
            <div 
              className={`w-16 h-8 rounded-full cursor-pointer relative transition-all duration-300 ${
                aiStatus 
                  ? 'bg-blue-600 bg-opacity-50' 
                  : 'bg-gray-700 border border-gray-600'
              }`}
              onClick={toggleAiPrediction}
            >
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-300 ${
                  aiStatus 
                    ? 'right-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                    : 'left-1 bg-gray-500 shadow-[0_0_10px_rgba(107,114,128,0.5)]'
                }`}
              />
            </div>
            <span className={`ml-3 text-sm ${aiStatus ? 'text-blue-400' : 'text-gray-400'}`}>
              {aiStatus ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <ConnectDataButton />
          
           <button 
            onClick={handleStartAssessment} 
            className="bg-green-600 hover:bg-green-700 text-black font-medium py-2 px-4 rounded-lg mr-6"
          >
            Start Risk Assessment
          </button>
        </div>
        
        {/* Key Features content */}
        <div className="mt-[-0px] px-8 pb-8">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">Key Features</h2>
            <p className="text-gray-400">
              Unlock the Power of ClimateGuard: Key Features to Enhance Your Climate Risk Assessment
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Advanced Analytics section */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3">Advanced Analytics & Predictive Models</h2>
              <p className="text-gray-400 text-sm mb-4">
                Execute comprehensive climate risk assessments with our AI-powered predictive modeling system.
              </p>
              
              <button className="bg-white text-black px-4 py-2 rounded mb-6">
                Explore 
              </button>
              
              {/* Chart */}
              <div className="relative h-56 mt-2">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                  {[...Array(5)].map((_, row) => (
                    [...Array(5)].map((_, col) => (
                      <div key={`${row}-${col}`} className="border border-gray-800" />
                    ))
                  ))}
                </div>
                
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d="M0,50 C10,40 20,60 30,55 S50,30 60,35 S80,50 90,30 L90,100 L0,100 Z"
                    stroke="#2196F3"
                    strokeWidth="1"
                    fill="rgba(33, 150, 243, 0.1)"
                    className="drop-shadow-lg"
                  />
                  <path 
                    d="M0,70 C10,65 30,80 40,75 S60,60 70,65 S80,75 90,60 L90,100 L0,100 Z"
                    stroke="#FF5722"
                    strokeWidth="1"
                    fill="rgba(255, 87, 34, 0.1)"
                    className="drop-shadow-lg"
                  />
                </svg>
                
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 transform translate-y-4.5">
                  <span>2023</span>
                  <span>2030</span>
                  <span>2040</span>
                  <span>2050</span>
                  <span>2060</span>
                </div>
              </div>
            </div>
            
           {/* RiskGuard Section */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3">RiskGuard: AI-Powered Risk Management</h2>
              <p className="text-gray-400 text-sm mb-4">
                RiskGuard is an AI-driven climate analysis tool providing real-time risk assessment by dynamically monitoring climate patterns, identifying vulnerable areas, and executing early warning systems for climate-related disasters.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-xs text-gray-400">Continuous Monitoring</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">90%</div>
                  <div className="text-xs text-gray-400">Prediction Accuracy</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-1xl font-bold text-purple-400">AI-Powered</div>
                  <div className="text-sm text-gray-400">Risk Assessment</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-1xl font-bold text-yellow-400">Data-Driven</div>
                  <div className="text-sm text-gray-400">Recommendations</div>
                </div>
              </div>
            </div>
            
            {/* Climate Indicators section with semicircle of icons */}
            <div className="bg-gray-900 rounded-lg p-6 relative overflow-hidden">
              <h2 className="text-xl font-bold mb-3">Comprehensive Climate Indicators</h2>
              <p className="text-gray-400 text-sm mb-4">
                Access a wide variety of climate indicators, including temperature trends, precipitation, sea level rise, extreme weather events, and more.
              </p>
              
              {/* Semicircle container */}
              <div className="relative h-64 flex justify-center">
                {/* Center logo */}
                <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center border-2 border-gray-700 shadow-lg">
                  <span className="text-xl font-bold text-blue-500">CG</span>
                </div>
                
                {/* Fixed semicircle */}
                <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="240" height="240" viewBox="0 0 240 240">
                  <path 
                    d="M120,0 A120,120 0 1,1 0,120"
                    fill="none"
                    stroke="#333"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </svg>
                
                {/* Rotating icons container */}
                <div 
                  className="absolute w-full h-full"
                  style={{ 
                    width: "240px", 
                    height: "240px",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    transformOrigin: "center"
                  }}
                >
                  {/* Temperature */}
                  <div className="absolute" style={{ top: "0", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🌡️</div>
                  </div>
                  
                  {/* Precipitation */}
                  <div className="absolute" style={{ top: "35px", right: "35px", transform: "translate(50%, -50%)" }}>
                    <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">💧</div>
                  </div>
                  
                  {/* Sea Level */}
                  <div className="absolute" style={{ top: "120px", right: "0", transform: "translate(50%, -50%)" }}>
                    <div className="bg-teal-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🌊</div>
                  </div>
                  
                  {/* Hurricanes */}
                  <div className="absolute" style={{ bottom: "35px", right: "35px", transform: "translate(50%, 50%)" }}>
                    <div className="bg-blue-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🌀</div>
                  </div>
                  
                  {/* Wildfires */}
                  <div className="absolute" style={{ bottom: "0", left: "50%", transform: "translate(-50%, 50%)" }}>
                    <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🔥</div>
                  </div>
                  
                  {/* Drought */}
                  <div className="absolute" style={{ bottom: "35px", left: "35px", transform: "translate(-50%, 50%)" }}>
                    <div className="bg-yellow-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🏜️</div>
                  </div>
                  
                  {/* Air Quality */}
                  <div className="absolute" style={{ top: "120px", left: "0", transform: "translate(-50%, -50%)" }}>
                    <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">💨</div>
                  </div>
                  
                  {/* Biodiversity */}
                  <div className="absolute" style={{ top: "35px", left: "35px", transform: "translate(-50%, -50%)" }}>
                    <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-lg">🌱</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Replace the Global Climate Risk Map with the Map component */}
            <Map />
            
            {/* Add the Prediction Form component */}
            <PredictionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;