import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Svg from "../components/Svg";
import Copyright from "../components/Copyright";
import Footer from "../components/Footer";

const AllServices = () => {
  const [services, setServices] = useState([
    {
      title: "Live Bus Tracker",
      desc: "Track buses in real-time and plan your travel better.",
      link: "/tracker",
    },
    {
      title: "Route Map",
      desc: "View detailed driving routes from your start to destination.",
      link: "/route-map",
    },
    {
      title: "Schedule & Timing",
      desc: "Stay informed about current and upcoming bus schedules.",
      link: "/schedule",
    },
    {
      title: "Support",
      desc: "Need help? Contact our support team anytime.",
      link: "/support",
    },
    {
      title: "Mobile App",
      desc: "Download our mobile app for faster access and live alerts.",
      link: "/mobile-app",
    },
    {
      title: "Contact",
      desc: "Have a query? We're here to assist you.",
      link: "/contact",
    },
  ]);

  // Optional: If you plan to fetch services from an API later
  // useEffect(() => {
  //   fetch("https://your-api-url.com/services")
  //     .then((res) => res.json())
  //     .then((data) => setServices(data))
  //     .catch((err) => console.error("Error fetching services:", err));
  // }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <Svg />
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-[#191919]">
              Our Services
            </h1>
            <p className="text-lg text-gray-600">
              Explore our platform offerings that help make your travel smoother and smarter.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full max-w-lg px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#191919] bg-white text-gray-800"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition duration-300"
              >
                <h2 className="text-xl font-bold text-[#191919]">{item.title}</h2>
                <p className="text-gray-600 mt-2">{item.desc}</p>
                <a
                  href={item.link}
                  className="text-[#191919] mt-4 inline-block hover:underline font-medium"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Copyright />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllServices;
