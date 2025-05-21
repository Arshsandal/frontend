// import React from 'react'
// import Navbar from '../components/Navbar'
// import Svg from '../components/Svg';       // Import your Svg component (if you have one)
// import Copyright from '../components/Copyright'; 
// import Footer from '../components/Footer';

// const AllServices = () => {
//   return (
//     <>
//  <Navbar />
//       <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a2e53f] via-[#a2e53f] to-[#a2e53f]">
//         <Svg /> {/* Assuming this is a background SVG component */}
//         <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
//           <div className="text-center text-white">
//             <h1 className="text-5xl font-bold mb-4">Our Services</h1>
//             <p className="text-lg opacity-90">
//               Explore our offerings and get to know how we can serve you better.
//             </p>
//           </div>
//           <div className="mt-8 flex justify-center">
//             <input
//               type="text"
//               placeholder="Search for services..."
//               className="w-full max-w-lg px-4 py-3 rounded-lg shadow-lg border-none focus:outline-none focus:ring-4 focus:ring-white bg-white bg-opacity-80 backdrop-blur-md text-gray-700 placeholder-gray-500"
//             />
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//             {[ 
//               { title: "Bus Services", desc: "Affordable and reliable transport to various destinations.", link: "/bus-services" },
//               { title: "Online Booking", desc: "Book tickets quickly and conveniently online.", link: "/online-booking" },
//               { title: "Customer Support", desc: "Reach out to our 24/7 customer support for assistance.", link: "/customer-support" },
//               { title: "Payment Options", desc: "We offer a variety of secure payment methods.", link: "/payment-options" },
//               { title: "Timetable", desc: "Find all the schedules for our bus routes here.", link: "/timetable" },
//               { title: "Contact Us", desc: "Have questions? Reach out to us.", link: "/contact-us" }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
//               >
//                 <h2 className="text-xl font-semibold text-indigo-700">{item.title}</h2>
//                 <p className="text-gray-700 mt-2">{item.desc}</p>
//                 <a href={item.link} className="text-indigo-500 mt-4 block hover:underline">
//                   Learn More →
//                 </a>
//               </div>
//             ))}
//           </div>
//           <Copyright />
//         </div>
//       </div>
//     <Footer />
//     </>
//   )
// }

// export default AllServices




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
