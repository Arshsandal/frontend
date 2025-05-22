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
    <div className="bg-indigo-900 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo and label */}
        <div className="flex items-center space-x-3">
          <NavLink to="/home" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8" />
            <div className="hidden sm:block">
              <span className="font-bold">Transport for London (TfL)</span>
              <br />
              <span className="text-sm">London, United Kingdom</span>
            </div>
          </NavLink>
        </div>

        {/* Mobile menu toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {/* Full Menu */}
      <div
        className={`sm:flex sm:items-center sm:justify-between sm:px-6 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="sm:flex sm:space-x-6 flex flex-col sm:flex-row bg-indigo-900 sm:bg-transparent px-4 sm:px-0 pb-4 sm:pb-0">
          {/* Plan Your Journey */}
          <li className="relative group">
            <button className="py-2 w-full text-left text-white font-medium flex justify-between items-center sm:inline">
              Plan Your Journey
              <i className="fas fa-chevron-down sm:ml-1"></i>
            </button>
            <div className="sm:absolute sm:bg-white sm:text-black sm:rounded sm:shadow-lg sm:mt-2 hidden sm:group-hover:block">
              <NavLink to="/routeMap" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Route Map
              </NavLink>
              <NavLink to="/schedulesAndStops" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Schedules & Stops
              </NavLink>
              <NavLink to="/discoverLondon" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Discover London
              </NavLink>
            </div>
          </li>

          {/* Services */}
          <li className="relative group">
            <button className="py-2 w-full text-left text-white font-medium flex justify-between items-center sm:inline">
              Services
              <i className="fas fa-chevron-down sm:ml-1"></i>
            </button>
            <div className="sm:absolute sm:bg-white sm:text-black sm:rounded sm:shadow-lg sm:mt-2 hidden sm:group-hover:block">
              <NavLink to="/allServices" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                All Services
              </NavLink>
              <NavLink to="/fixLounge" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Fix Lounge
              </NavLink>
              <NavLink to="/onBoard" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                On Board
              </NavLink>
              <NavLink to="/safety" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Safety
              </NavLink>
              <NavLink to="/customerSatisfaction" className="block px-4 py-2 hover:bg-indigo-700 sm:hover:text-white text-white sm:text-black">
                Customer Satisfaction
              </NavLink>
            </div>
          </li>

          {/* Simple NavLinks */}
          <li>
            <NavLink to="/tripTracker" className="block py-2 hover:text-indigo-300 text-white font-medium">
              Trip Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className="block py-2 hover:text-indigo-300 text-white font-medium">
              Help
            </NavLink>
          </li>

          {/* Login / User Info */}
          {username ? (
            <li className="relative group">
              <div className="py-2 font-medium text-white">
                Welcome,{" "}
                <span className="underline decoration-white">{username}</span>
              </div>
              <div className="sm:absolute sm:bg-white sm:text-black sm:rounded sm:shadow-lg sm:mt-2 hidden sm:group-hover:block">
                <NavLink to="/profile" className="block px-4 py-2 text-white hover:bg-indigo-700 sm:text-black sm:hover:text-white">
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-indigo-700 sm:text-black sm:hover:text-white"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="block py-2 hover:text-indigo-300 text-white font-medium">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
