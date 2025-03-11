import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home,
  BarChart2,
  AlertTriangle,
  Map,
  Droplet,
  Thermometer,
  Layers,
  ChevronDown,
  AlertCircle,
  Shield
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [riskCategoriesExpanded, setRiskCategoriesExpanded] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-70 bg-gray-900 min-h-screen fixed p-6 border-r border-gray-800 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xl">CR</div>
          </div>
          <h2 className="text-2xl font-bold text-white">ClimateResilience</h2>
        </div>
      </div>

      {/* Navigation Items */}
      <nav>
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 mb-3 px-3 uppercase">Main Navigation</p>
          <NavItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={location.pathname === "/dashboard"} 
            onClick={() => handleNavigation("/dashboard")}
          />
          <NavItem 
            icon={<Map size={20} />} 
            label="Risk Map" 
            active={location.pathname === "/map"} 
            onClick={() => handleNavigation("/map")}
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3 px-3 uppercase">Analysis Tools</p>
          <NavItem 
            icon={<Layers size={20} />} 
            label="Vulnerability Analysis" 
            active={location.pathname === "/vulnerability"} 
            onClick={() => handleNavigation("/vulnerability")}
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            label="Predictive Models" 
            active={location.pathname === "/predictive-models"} 
            onClick={() => handleNavigation("/predictive-models")}
            badge="AI"
          />
          <NavItem 
            icon={<AlertCircle size={20} />} 
            label="Early Warning" 
            active={location.pathname === "/early-warning"} 
            onClick={() => handleNavigation("/early-warning")}
          />
        </div>

        {/* Risk Categories Section */}
        <div className="mt-6">
          <div 
            className="flex items-center justify-between px-3 py-2 cursor-pointer"
            onClick={() => setRiskCategoriesExpanded(!riskCategoriesExpanded)}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase">Risk Categories</p>
            <ChevronDown 
              size={16} 
              className={`text-gray-400 transition-transform duration-200 ${riskCategoriesExpanded ? "rotate-180" : ""}`}
            />
          </div>
          
          {riskCategoriesExpanded && (
            <div className="mt-2">
              <NavItem 
                icon={<div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"><Droplet size={14} className="text-white" /></div>} 
                label="Flood Risk" 
                active={location.pathname === "/flood-risk"} 
                onClick={() => handleNavigation("/flood-risk")}
                subtitle="Water Levels"
              />
              <NavItem 
                icon={<div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center"><Thermometer size={14} className="text-white" /></div>} 
                label="Heat Waves" 
                active={location.pathname === "/heat-waves"} 
                onClick={() => handleNavigation("/heat-waves")}
                subtitle="Temperature"
              />
              <NavItem 
                icon={<div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"><AlertTriangle size={14} className="text-white" /></div>} 
                label="Sea Level Rise" 
                active={location.pathname === "/sea-level"} 
                onClick={() => handleNavigation("/sea-level")}
                subtitle="Coastal Impact"
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-400 mb-3 px-3 uppercase">Resilience Planning</p>
          <NavItem 
            icon={<Shield size={20} />} 
            label="Mitigation Strategies" 
            active={location.pathname === "/mitigation"} 
            onClick={() => handleNavigation("/mitigation")}
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, badge, subtitle }) => {
  return (
    <div 
      className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group
        ${active ? "bg-green-900/50 text-green-400" : "hover:bg-gray-800 text-gray-300"}`}
      onClick={onClick}
    >
      <div className={`${active ? "text-green-400" : "text-gray-400 group-hover:text-gray-200"}`}>
        {icon}
      </div>
      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <span className={`font-medium ${active ? "text-green-400" : "group-hover:text-gray-200"}`}>{label}</span>
          {badge && (
            <span className="bg-green-900 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">{badge}</span>
          )}
        </div>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
};

export default Navbar;