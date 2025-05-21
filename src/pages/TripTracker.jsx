import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TripTracker = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-5ofy.onrender.com/api/auth/getBuses");
        setRoutes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Axios Error:", err.message);
        setError("Failed to load live data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.lineName?.toLowerCase().includes(search.toLowerCase()) ||
    route.stationName?.toLowerCase().includes(search.toLowerCase()) ||
    route.towards?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden p-8 border border-gray-200">
          <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            🚍 Real-Time Public Transport Tracker (TfL API)
          </h3>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 mb-6 shadow-sm w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search line, station, destination..."
              className="w-full px-4 py-2 bg-transparent text-gray-900 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Loading & Error */}
          {loading && (
            <p className="text-gray-600 text-center animate-pulse">
              Fetching live data...
            </p>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Route Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-50 border p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("Naptan Id", route.naptanId);

                      navigate(`/trip/${index}`, {
                        state: {
                          lineName: route.lineName,
                          stationName: route.stationName,
                          destination: route.towards,
                          timeToStation: route.timeToStation,
                          expectedArrival: route.expectedArrival,
                          platformName: route.platformName,
                          vehicleId: route.vehicleId,
                          naptanId: route.naptanId,
                        },
                      });
                    }}
                  >
                    <h4 className="text-lg font-bold text-gray-800 flex justify-between">
                      🚌 Line {route.lineName}
                      <span className="text-sm text-gray-600">#{index + 1}</span>
                    </h4>
                    <p className="text-gray-700 mt-1 font-medium">
                      📍 {route.stationName} ➝ {route.towards}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      ⏱️ Arriving in {(route.timeToStation / 60).toFixed(1)} minutes
                    </p>
                    <button
                      className="mt-3 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition shadow-md transform hover:scale-105"
                      style={{ backgroundColor: "#191919" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorage.setItem("Naptan Id", route.naptanId);

                        navigate(`/trip/${index}`, {
                          state: {
                            lineName: route.lineName,
                            stationName: route.stationName,
                            destination: route.towards,
                            timeToStation: route.timeToStation,
                            expectedArrival: route.expectedArrival,
                            platformName: route.platformName,
                            vehicleId: route.vehicleId,
                            naptanId: route.naptanId,
                          },
                        });
                      }}
                    >
                      Check Status 📍
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center w-full col-span-2">
                  No matching live routes found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TripTracker;
