// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../assets/Images/Logo_white.svg"

// const Navbar = () => {
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setUsername("");
//     navigate("/home", { replace: true });
//   };

//   return (
//     <div className="header">
//       <div className="main">
//         <nav className="navbar shadow-lg">
//           <div className="logo">
//             <NavLink to="/home" end>
//               <img src={logo} alt="Logo" />

//             </NavLink>
//             <div className="ctu-nav">
//               <span className="bold">Transport for London (TfL).</span>
//               <span className="s-bold"> London, United Kingdom.</span>
//             </div>
//           </div>

//           <ul className="navbar-ul">
//             <li style={{ color: "white" }} className="dropdown">
//               <button className="dropbtn" style={{ color: "white" }}>
//                 Plan Your Journey <i className="fa-solid fa-chevron-down"></i>
//               </button>
//               <div className="dropdown-content">
//                 <NavLink to="/routeMap" className="text-white hover:text-white">
//                   Route Map
//                 </NavLink>
//                 <hr />
//                 <NavLink
//                   to="/schedulesAndStops"
//                   className="text-white hover:text-white"
//                 >
//                   Schedules & Stops
//                 </NavLink>
//                 <hr />
//                 <NavLink
//                   to="/discoverLondon"
//                   className="text-white hover:text-white"
//                 >
//                   Discover London
//                 </NavLink>
//               </div>
//             </li>

//             <li style={{ color: "white" }} className="dropdown">
//               <button className="dropbtn" style={{ color: "white" }}>
//                 Services <i className="fa-solid fa-chevron-down"></i>
//               </button>
//               <div className="dropdown-content">
//                 <NavLink to="/allServices" className="text-white">
//                   All Services
//                 </NavLink>
//                 <hr />
//                 <NavLink to="/fixLounge" className="text-white hover:text-white">
//                   Fix Lounge
//                 </NavLink>
//                 <hr />
//                 <NavLink to="/onBoard" className="text-white hover:text-white">
//                   On Board
//                 </NavLink>
//                 <hr />
//                 <NavLink to="/safety" className="text-white hover:text-white">
//                   Safety
//                 </NavLink>
//                 <hr />
//                 <NavLink
//                   to="/customerSatisfaction"
//                   className="text-white hover:text-white"
//                 >
//                   Customer Satisfaction
//                 </NavLink>
//               </div>
//             </li>

//             <li style={{ color: "white" }}>
//               <NavLink to="/tripTracker" className="text-white hover:text-white">
//                 Trip Tracker
//               </NavLink>
//             </li>

//             <li style={{ color: "white" }}>
//               <NavLink to="/help" className="text-white hover:text-white">
//                 Help
//               </NavLink>
//             </li>

//             {username ? (
//               <li
//                 style={{ color: "white" }}
//                 className="ml-2 max-w-full h-[30px] px-3 rounded-full inline-block font-semibold relative cursor-pointer group text-white transition-colors duration-200 whitespace-nowrap"
//               >
//                 <div className="text-white">Welcome,</div>
//                 <div className="text-white group-hover:text-white group-hover:underline transition-colors duration-200">
//                   {username}
//                 </div>
//                 <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 text-sm">
//                   <NavLink to="/profile">
//                     <button className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#808080] hover:text-white transition-colors duration-200 rounded-t-[5px]">
//                       Profile
//                     </button>
//                   </NavLink>
//                   <hr className="border-gray-300" />
//                   <button
//                     className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#808080] hover:text-white transition-colors duration-200 rounded-b-[5px]"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </li>
//             ) : (
//               <li style={{ color: "white" }}>
//                 <NavLink to="/login" className="text-white hover:text-white">
//                   Login
//                 </NavLink>
//               </li>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Images/Logo_white.svg";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="header">
      <div className="main">
        <nav className="navbar shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo */}
            <div className="logo flex items-center space-x-3">
              <NavLink to="/home" end className="flex items-center">
                <img src={logo} alt="Logo" className="h-8" />
              </NavLink>
              <div className="ctu-nav hidden sm:block">
                <span className="bold">Transport for London (TfL).</span>
                <span className="s-bold"> London, United Kingdom.</span>
              </div>
            </div>

            {/* Hamburger menu */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-2xl focus:outline-none"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <ul
            className={`navbar-ul flex flex-col sm:flex-row sm:items-center sm:justify-end px-4 sm:px-0 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "block" : "hidden sm:flex"
            }`}
          >
            {/* Plan Your Journey Dropdown */}
            <li className="dropdown text-white w-full sm:w-auto">
              <button
                className="dropbtn text-white w-full sm:w-auto text-left sm:text-center"
                onClick={() => toggleDropdown("journey")}
              >
                Plan Your Journey{" "}
                <i className="fa-solid fa-chevron-down ml-1"></i>
              </button>
              <div
                className={`dropdown-content ${
                  openDropdown === "journey" ? "block" : "hidden"
                } sm:block`}
              >
                <NavLink to="/routeMap" className="text-white">
                  Route Map
                </NavLink>
                <hr />
                <NavLink to="/schedulesAndStops" className="text-white">
                  Schedules & Stops
                </NavLink>
                <hr />
                <NavLink to="/discoverLondon" className="text-white">
                  Discover London
                </NavLink>
              </div>
            </li>

            {/* Services Dropdown */}
            <li className="dropdown text-white w-full sm:w-auto">
              <button
                className="dropbtn text-white w-full sm:w-auto text-left sm:text-center"
                onClick={() => toggleDropdown("services")}
              >
                Services <i className="fa-solid fa-chevron-down ml-1"></i>
              </button>
              <div
                className={`dropdown-content ${
                  openDropdown === "services" ? "block" : "hidden"
                } sm:block`}
              >
                <NavLink to="/allServices" className="text-white">
                  All Services
                </NavLink>
                <hr />
                <NavLink to="/fixLounge" className="text-white">
                  Fix Lounge
                </NavLink>
                <hr />
                <NavLink to="/onBoard" className="text-white">
                  On Board
                </NavLink>
                <hr />
                <NavLink to="/safety" className="text-white">
                  Safety
                </NavLink>
                <hr />
                <NavLink to="/customerSatisfaction" className="text-white">
                  Customer Satisfaction
                </NavLink>
              </div>
            </li>

            {/* Regular Links */}
            <li className="text-white w-full sm:w-auto">
              <NavLink to="/tripTracker" className="text-white block py-2 sm:py-0">
                Trip Tracker
              </NavLink>
            </li>
            <li className="text-white w-full sm:w-auto">
              <NavLink to="/help" className="text-white block py-2 sm:py-0">
                Help
              </NavLink>
            </li>

            {/* User Info */}
            {username ? (
              <li className="relative text-white w-full sm:w-auto">
                <div className="py-2">
                  <div className="text-white">Welcome,</div>
                  <div className="text-white font-semibold">{username}</div>
                </div>
                <div className="w-full sm:absolute sm:right-0 sm:w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50 text-sm hidden sm:group-hover:block">
                  <NavLink to="/profile">
                    <button className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#808080] hover:text-white transition-colors duration-200 rounded-t-[5px]">
                      Profile
                    </button>
                  </NavLink>
                  <hr className="border-gray-300" />
                  <button
                    className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#808080] hover:text-white transition-colors duration-200 rounded-b-[5px]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="text-white w-full sm:w-auto">
                <NavLink to="/login" className="text-white block py-2 sm:py-0">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
