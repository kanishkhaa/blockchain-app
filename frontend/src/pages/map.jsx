import React, { useEffect, useState } from 'react';

// Note: In your actual project, you'll need to install leaflet via npm:
// npm install leaflet react-leaflet

const Map = () => {
  // This will be rendered after useEffect runs
  const [mapInitialized, setMapInitialized] = useState(false);
  
  useEffect(() => {
    // Create a script element to load Leaflet CSS
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(leafletCss);
    
    // Create a script element to load Leaflet JS
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
    leafletScript.async = true;
    
    // Initialize the map after Leaflet script is loaded
    leafletScript.onload = () => {
      initializeMap();
      setMapInitialized(true);
    };
    
    document.body.appendChild(leafletScript);
    
    // Cleanup function
    return () => {
      document.head.removeChild(leafletCss);
      document.body.removeChild(leafletScript);
    };
  }, []);
  
  const initializeMap = () => {
    // Make sure the map container exists
    const mapContainer = document.getElementById('india-climate-map');
    if (!mapContainer) return;
    
    // Initialize map centered on India
    const map = L.map('india-climate-map').setView([20.5937, 78.9629], 5);
    
    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      // Using a dark style for the base map to match the application theme
      className: 'map-tiles-dark'
    }).addTo(map);
    
    // Add custom CSS for dark map tiles
    const style = document.createElement('style');
    style.innerHTML = `
      .map-tiles-dark {
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
      }
      .leaflet-container {
        background: #333;
      }
    `;
    document.head.appendChild(style);
    
    // Define risk zones for India (coordinates are approximate)
    const riskZones = [
      {
        name: 'Mumbai Coastal Area',
        type: 'Sea Level Rise',
        severity: 'High',
        coordinates: [19.0760, 72.8777],
        radius: 30000,
        color: 'rgba(0, 188, 212, 0.7)'
      },
      {
        name: 'Chennai Flood Zone',
        type: 'Flooding',
        severity: 'High',
        coordinates: [13.0827, 80.2707],
        radius: 25000,
        color: 'rgba(33, 150, 243, 0.7)'
      },
      {
        name: 'Rajasthan Drought Area',
        type: 'Drought',
        severity: 'Severe',
        coordinates: [26.9124, 75.7873],
        radius: 45000,
        color: 'rgba(255, 193, 7, 0.7)'
      },
      {
        name: 'Delhi Heat Zone',
        type: 'Heat Waves',
        severity: 'Extreme',
        coordinates: [28.7041, 77.1025],
        radius: 35000,
        color: 'rgba(255, 87, 34, 0.7)'
      },
      {
        name: 'Assam Flood Plains',
        type: 'Flooding',
        severity: 'Moderate',
        coordinates: [26.2006, 92.9376],
        radius: 28000,
        color: 'rgba(33, 150, 243, 0.5)'
      },
      {
        name: 'Kerala Landslide Risk',
        type: 'Landslides',
        severity: 'Moderate',
        coordinates: [10.8505, 76.2711],
        radius: 22000,
        color: 'rgba(121, 85, 72, 0.7)'
      },
      {
        name: 'Gujarat Cyclone Zone',
        type: 'Cyclones',
        severity: 'High',
        coordinates: [22.2587, 71.1924],
        radius: 40000,
        color: 'rgba(156, 39, 176, 0.7)'
      }
    ];
    
    // Add circles for risk zones
    riskZones.forEach(zone => {
      const circle = L.circle(zone.coordinates, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.5,
        radius: zone.radius
      }).addTo(map);
      
      // Add popup with information
      circle.bindPopup(`
        <strong>${zone.name}</strong><br>
        Risk Type: ${zone.type}<br>
        Severity: ${zone.severity}
      `);
    });
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.padding = '6px 8px';
      div.style.background = 'rgba(0, 0, 0, 0.7)';
      div.style.color = 'white';
      div.style.borderRadius = '4px';
      
      const riskTypes = [
        { type: 'Sea Level Rise', color: 'rgba(0, 188, 212, 0.7)' },
        { type: 'Flooding', color: 'rgba(33, 150, 243, 0.7)' },
        { type: 'Drought', color: 'rgba(255, 193, 7, 0.7)' },
        { type: 'Heat Waves', color: 'rgba(255, 87, 34, 0.7)' },
        { type: 'Landslides', color: 'rgba(121, 85, 72, 0.7)' },
        { type: 'Cyclones', color: 'rgba(156, 39, 176, 0.7)' }
      ];
      
      div.innerHTML = '<h4 style="margin:0 0 5px 0">Climate Risks</h4>';
      
      riskTypes.forEach(risk => {
        div.innerHTML += `
          <div style="display:flex; align-items:center; margin-bottom:3px">
            <span style="display:inline-block; width:16px; height:16px; border-radius:50%; background:${risk.color}; margin-right:5px"></span>
            <span>${risk.type}</span>
          </div>
        `;
      });
      
      return div;
    };
    
    legend.addTo(map);
  };
  
  return (
    <div className="col-span-3 bg-gray-900 rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">India Climate Risk Map</h2>
      
      <div className="bg-gray-800 rounded-lg p-4 h-96 relative">
        <div id="india-climate-map" style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}></div>
        
        {!mapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 rounded-lg">
            <div className="text-white text-lg">Loading map...</div>
          </div>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-blue-400 font-bold mb-2">Coastal Vulnerability</h3>
          <p className="text-gray-400 text-sm">Analysis of sea level rise impact on India's 7,500+ km coastline affecting major cities like Mumbai.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-red-400 font-bold mb-2">Heat Wave Forecast</h3>
          <p className="text-gray-400 text-sm">Northern India's heat corridors with temperature projections and population impact analysis.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-yellow-400 font-bold mb-2">Monsoon Patterns</h3>
          <p className="text-gray-400 text-sm">Changing monsoon patterns affecting agriculture and water security across Indian states.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-purple-400 font-bold mb-2">Cyclone Tracking</h3>
          <p className="text-gray-400 text-sm">Early warning system for Bay of Bengal and Arabian Sea cyclones with intensity predictions.</p>
        </div>
      </div>
    </div>
  );
};

export default Map;