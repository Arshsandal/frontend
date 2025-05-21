import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "John Doe";
    const storedEmail = localStorage.getItem("email") || "johndoe@example.com";
    setUsername(storedUsername);
    setEmail(storedEmail);
    
setRoutes([
  {
    route_number: "7",
    start: "East Acton (Brunel Road)",
    end: "Oxford Circus",
    via: "Hammersmith Hospital, Ladbroke Grove Station, Paddington Station, Edgware Road, Marble Arch, Bond Street"
  },
  {
    route_number: "D7",
    start: "Poplar (All Saints Church)",
    end: "Mile End Station",
    via: "Aspen Way, Stewart Street, Island Gardens Station, Canary Wharf, Westferry Station"
  },
  {
    route_number: "E7",
    start: "Ruislip Station",
    end: "Ealing Broadway Station",
    via: "Ruislip Gardens, RAF Northolt, Greenford High School, Greenford Broadway, West Ealing"
  }
]);

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden p-8 flex flex-row border border-gray-300">
        {/* Left Sidebar - Navigation */}
        <div className="w-1/4 flex flex-col items-start space-y-6 border-r pr-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">{username}</h2>
            <p className="text-gray-600 text-sm">{email}</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
          <NavLink to="/myBooking" className="w-full text-left px-4 py-3 bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800 font-medium rounded-md transition-all">My Bookings</NavLink>
          <NavLink to="/paymentMethods" className="w-full text-left px-4 py-3 bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800 font-medium rounded-md transition-all">Payment Methods</NavLink>
          <NavLink to="/profileSettings" className="w-full text-left px-4 py-3 bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800 font-medium rounded-md transition-all">Settings</NavLink>
          <NavLink to="/notifications" className="w-full text-left px-4 py-3 bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800 font-medium rounded-md transition-all">Notifications</NavLink>
          <NavLink to="/support" className="w-full text-left px-4 py-3 bg-gray-200 hover:bg-green-500 hover:text-white text-gray-800 font-medium rounded-md transition-all">Support</NavLink>
          <button onClick={handleLogout} className="w-full text-left bg-red-500 text-white px-4 py-3 rounded-md shadow-sm hover:bg-red-600 transition-all cursor-pointer">Logout</button>
        </div>

        {/* Right Section - Details */}
        <div className="w-3/4 flex flex-col px-8">
          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Payment Methods</h3>
            <p className="text-gray-600 text-sm mt-2">Visa ending in 1234</p>
            <p className="text-gray-600 text-sm">MasterCard ending in 5678</p>
          </div>

          {/* Upcoming Trips */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Upcoming Trips</h3>
            {routes.map((route, index) => (
              <p key={index} className="text-gray-600 text-sm mt-2">
                Route {route.route_number}: {route.start} to {route.end} via {route.via}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProfilePage;
