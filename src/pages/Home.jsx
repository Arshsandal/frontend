import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // ✅ Toast import
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [stations, setStations] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔐 Retrieve token
        if (!token) {
          toast.warning("Please login to search buses."); // 🔔 Warn user
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/getBuses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data || [];
        const uniqueStations = Array.from(
          new Set(data.map((item) => item.stationName))
        ).map((station) => ({
          value: station,
          label: station,
        }));

        setStations(uniqueStations);
      } catch (error) {
        console.error("Failed to fetch station data:", error);
        toast.error("Unable to fetch station data.");
      }
    };

    fetchStations();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to search buses."); // 🔔 Prevent submission
      return;
    }

    navigate("/tripTracker", {
      state: { initialSearch: selectedFrom },
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toast container */}
      <section className="hero">
        <div className="slideshow-container">
          <div className="slider">
            <div className="slider-content">
              <div className="text welcome-text">
                <h1 className="slider-ctu-welcome">
                  Welcome to London’s Smart Transit Portal
                </h1>
                <p className="welcome-p">
                  Experience the future of city travel with real-time updates
                  straight from London’s public transportation system. Our
                  platform brings you live bus arrival times powered by the
                  official Transport for London.
                </p>
              </div>
            </div>

            <div className="search-buses w-full">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Search Buses By Bus Stops</legend>

                  <label htmlFor="from">From</label>
                  <select
                    id="stationFrom"
                    className="w-[30%]"
                    value={selectedFrom}
                    onChange={(e) => setSelectedFrom(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Station From
                    </option>
                    {stations.map((station, index) => (
                      <option key={index} value={station.value}>
                        {station.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="to">To</label>
                  <select
                    id="stationTo"
                    className="w-[30%]"
                    value={selectedTo}
                    onChange={(e) => setSelectedTo(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Station To
                    </option>
                    {stations.map((station, index) => (
                      <option key={index} value={station.value}>
                        {station.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="submit"
                    className="search-btn w-48 px-6 py-2 text-white rounded cursor-pointer hover:bg-blue-700 transition"
                    value="Search"
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
