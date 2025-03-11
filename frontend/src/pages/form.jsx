import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    Year: 2025,
    WRI: 0,
    Exposure: 0,
    Vulnerability: 0,
    Susceptibility: 0,
    "Lack of Coping Capabilities": 0,
    "Lack of Adaptive Capacities": 0,
    CPI: 0,
    Latitude: 0,
    Longitude: 0,
    "Reconstruction Costs ('000 US$)": 0,
    "No Affected": 0
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "Year" || name === "No Affected" 
      ? parseInt(value) || 0 
      : parseFloat(value) || 0;
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Send data to backend API
      const response = await fetch('/api/predict-disaster-impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      setPredictions({
        totalDeaths: result.total_deaths,
        totalDamages: result.total_damages
      });
    } catch (err) {
      console.error('Error:', err);
      setError("Failed to get predictions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "WRI", "Exposure", "Vulnerability", "Susceptibility", 
    "Lack of Coping Capabilities", "Lack of Adaptive Capacities", 
    "CPI", "Latitude", "Longitude", "Reconstruction Costs ('000 US$)"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Disaster Impact Predictor
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="Year"
                  value={formData.Year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Affected
                </label>
                <input
                  type="number"
                  name="No Affected"
                  value={formData["No Affected"]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              {features.map((feature) => (
                <div key={feature}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {feature}
                  </label>
                  <input
                    type="number"
                    name={feature}
                    value={formData[feature]}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-black font-medium rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Processing..." : "Predict Impact"}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {predictions && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Predicted Disaster Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Total Deaths
                  </h3>
                  <p className="text-3xl font-bold text-red-600">
                    {predictions.totalDeaths.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Total Damages ('000 US$)
                  </h3>
                  <p className="text-3xl font-bold text-amber-600">
                    {predictions.totalDamages.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;