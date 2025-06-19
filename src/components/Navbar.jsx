import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Images/Logo_white.svg";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    navigate("/home", { replace: true });
  };

  return (
    <nav className="bg-[#191919] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Label */}
          <div className="flex items-center">
            <NavLink to="/home" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <div className="sm:block leading-tight">
                <span className="block font-bold">Transport for London (TfL).</span>
                <span className="block text-sm">London, United Kingdom.</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:underline">
                <span>Plan Your Journey</span>
                <i className="fa-solid fa-chevron-down text-sm" />
              </button>
              <div className="absolute left-0 w-48 bg-[#191919] border border-gray-700 rounded shadow-lg hidden group-hover:block z-50">
                <NavLink to="/routeMap" className="block px-4 py-2 hover:bg-gray-800">Route Map</NavLink>
                <NavLink to="/schedulesAndStops" className="block px-4 py-2 hover:bg-gray-800">Schedules & Stops</NavLink>
                <NavLink to="/discoverLondon" className="block px-4 py-2 hover:bg-gray-800">Discover London</NavLink>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 hover:underline">
                <span>Services</span>
                <i className="fa-solid fa-chevron-down text-sm" />
              </button>
              <div className="absolute left-0 w-52 bg-[#191919] border border-gray-700 rounded shadow-lg hidden group-hover:block z-50">
                <NavLink to="/allServices" className="block px-4 py-2 hover:bg-gray-800">All Services</NavLink>
                <NavLink to="/fixLounge" className="block px-4 py-2 hover:bg-gray-800">Fix Lounge</NavLink>
                <NavLink to="/onBoard" className="block px-4 py-2 hover:bg-gray-800">On Board</NavLink>
                <NavLink to="/safety" className="block px-4 py-2 hover:bg-gray-800">Safety</NavLink>
                <NavLink to="/customerSatisfaction" className="block px-4 py-2 hover:bg-gray-800">Customer Satisfaction</NavLink>
              </div>
            </div>

            <NavLink to="/tripTracker" className="hover:underline">Trip Tracker</NavLink>
            <NavLink to="/help" className="hover:underline">Help</NavLink>

            {username ? (
              <div className="relative group">
                <button className="hover:underline">Welcome, {username}</button>
                <div className="absolute right-0 w-40 bg-[#191919] border border-gray-700 rounded shadow-lg hidden group-hover:block z-50">
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <NavLink to="/login" className="hover:underline">Login</NavLink>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {/* Plan Your Journey (mobile dropdown) */}
          <div>
            <button
              onClick={() => setPlanOpen(!planOpen)}
              className="w-full text-left py-2 font-medium flex justify-between items-center"
            >
              Plan Your Journey
              <span>{planOpen ? "▲" : "▼"}</span>
            </button>
            {planOpen && (
              <div className="ml-4 space-y-1">
                <NavLink to="/routeMap" className="block py-1 hover:underline">Route Map</NavLink>
                <NavLink to="/schedulesAndStops" className="block py-1 hover:underline">Schedules & Stops</NavLink>
                <NavLink to="/discoverLondon" className="block py-1 hover:underline">Discover London</NavLink>
              </div>
            )}
          </div>

          {/* Services (mobile dropdown) */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full text-left py-2 font-medium flex justify-between items-center"
            >
              Services
              <span>{servicesOpen ? "▲" : "▼"}</span>
            </button>
            {servicesOpen && (
              <div className="ml-4 space-y-1">
                <NavLink to="/allServices" className="block py-1 hover:underline">All Services</NavLink>
                <NavLink to="/fixLounge" className="block py-1 hover:underline">Fix Lounge</NavLink>
                <NavLink to="/onBoard" className="block py-1 hover:underline">On Board</NavLink>
                <NavLink to="/safety" className="block py-1 hover:underline">Safety</NavLink>
                <NavLink to="/customerSatisfaction" className="block py-1 hover:underline">Customer Satisfaction</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/tripTracker" className="block py-2 hover:underline">Trip Tracker</NavLink>
          <NavLink to="/help" className="block py-2 hover:underline">Help</NavLink>

          {username ? (
            <div className="space-y-1">
              <span className="block py-2 font-semibold">Welcome, {username}</span>
              <NavLink to="/profile" className="block py-2 hover:underline">Profile</NavLink>
              <button onClick={handleLogout} className="block py-2 hover:underline">Logout</button>
            </div>
          ) : (
            <NavLink to="/login" className="block py-2 hover:underline">Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
