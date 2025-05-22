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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
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

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="header">
      <div className="main">
        <nav className="navbar shadow-lg bg-black text-white relative">
          {/* Logo and Mobile Toggle */}
          <div className="flex justify-between items-center w-full px-4 py-2">
            <NavLink to="/home" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8" />
              <div className="ml-2 hidden sm:block ctu-nav">
                <span className="bold">Transport for London (TfL).</span>
                <span className="s-bold"> London, United Kingdom.</span>
              </div>
            </NavLink>

            {/* Mobile Hamburger */}
            <button
              className="sm:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fa fa-bars text-xl"></i>
            </button>
          </div>

          {/* Menu */}
          <ul
            className={`navbar-ul flex-col sm:flex-row sm:flex ${
              mobileMenuOpen ? "flex" : "hidden"
            } sm:items-center sm:justify-end text-white px-4 sm:px-0`}
          >
            {/* Dropdown 1 */}
            <li className="dropdown relative">
              <button
                className="dropbtn text-white flex items-center justify-between w-full sm:w-auto"
                onClick={() => toggleDropdown(1)}
              >
                Plan Your Journey <i className="fa-solid fa-chevron-down ml-1"></i>
              </button>
              <div
                className={`dropdown-content bg-black text-white absolute sm:static ${
                  dropdownOpen === 1 ? "block" : "hidden"
                }`}
              >
                <NavLink to="/routeMap">Route Map</NavLink>
                <hr />
                <NavLink to="/schedulesAndStops">Schedules & Stops</NavLink>
                <hr />
                <NavLink to="/discoverLondon">Discover London</NavLink>
              </div>
            </li>

            {/* Dropdown 2 */}
            <li className="dropdown relative">
              <button
                className="dropbtn text-white flex items-center justify-between w-full sm:w-auto"
                onClick={() => toggleDropdown(2)}
              >
                Services <i className="fa-solid fa-chevron-down ml-1"></i>
              </button>
              <div
                className={`dropdown-content bg-black text-white absolute sm:static ${
                  dropdownOpen === 2 ? "block" : "hidden"
                }`}
              >
                <NavLink to="/allServices">All Services</NavLink>
                <hr />
                <NavLink to="/fixLounge">Fix Lounge</NavLink>
                <hr />
                <NavLink to="/onBoard">On Board</NavLink>
                <hr />
                <NavLink to="/safety">Safety</NavLink>
                <hr />
                <NavLink to="/customerSatisfaction">Customer Satisfaction</NavLink>
              </div>
            </li>

            {/* Other Links */}
            <li>
              <NavLink to="/tripTracker">Trip Tracker</NavLink>
            </li>
            <li>
              <NavLink to="/help">Help</NavLink>
            </li>

            {/* Login/Welcome */}
            {username ? (
              <li className="relative group">
                <div className="text-white">Welcome,</div>
                <div className="group-hover:underline">{username}</div>
                <div className="absolute right-0 mt-2 w-40 bg-white text-black border border-gray-300 shadow-lg rounded z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 text-sm">
                  <NavLink to="/profile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white">
                      Profile
                    </button>
                  </NavLink>
                  <hr />
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
