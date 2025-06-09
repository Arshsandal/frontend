// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const RouteMap = () => {
//   const [startLocation, setStartLocation] = useState("");
//   const [destination, setDestination] = useState("");
//   const [route, setRoute] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
//     script.async = true;
//     script.onload = () => {
//       setLoading(false);
//       initMap();
//     };
//     document.body.appendChild(script);
//     setLoading(true);
//   }, []);

//   const initMap = () => {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
//       zoom: 12,
//     });

//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(map);

//     if (route.length > 0) {
//       const waypoints = route.map((point) => ({
//         location: new google.maps.LatLng(point.lat, point.lng),
//       }));

//       directionsService.route(
//         {
//           origin: startLocation,
//           destination: destination,
//           waypoints: waypoints,
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//           if (status === "OK") {
//             directionsRenderer.setDirections(response);
//           } else {
//             console.error("Directions request failed due to", status);
//           }
//         }
//       );
//     }
//   };

//   const fetchRoute = () => {
//     setRoute([
//       { lat: 28.6139, lng: 77.2090 },
//       { lat: 28.6304, lng: 77.2177 },
//       { lat: 28.6424, lng: 77.2187 },
//     ]);
//     initMap();
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//         <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden p-8 border border-gray-200">
//           <h3 className="text-3xl font-extrabold text-center mb-6" style={{ color: "#191919" }}>
//             🧭 SmartRoute: Live Map Navigator
//           </h3>

//           <p className="text-center text-gray-600 mb-6">
//             Plan and visualize your driving route between any two points with live map rendering using Google Maps.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
//             <input
//               type="text"
//               placeholder="Enter start location..."
//               value={startLocation}
//               onChange={(e) => setStartLocation(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm focus:outline-none"
//             />
//             <input
//               type="text"
//               placeholder="Enter destination..."
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm focus:outline-none"
//             />
//             <button
//               onClick={fetchRoute}
//               className="bg-[#191919] text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 transition"
//             >
//               Show Route 📍
//             </button>
//           </div>

//           {loading && (
//             <p className="text-gray-600 text-center animate-pulse mb-4">
//               Loading Google Map...
//             </p>
//           )}

//           <div id="map" className="w-full h-[450px] rounded-lg border" style={{ borderColor: "#191919" }}></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default RouteMap;



import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

// Fix leaflet default icon issue (important)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const RouteMap = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [busStops, setBusStops] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bus stops for input suggestions
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/getBuses")
      .then((res) => res.json())
      .then((data) => {
        setBusStops(data);
        if (data.length >= 2) {
          setStartLocation(data[0].location);
          setDestination(data[1].location);
        }
      })
      .catch((err) => console.error("Error loading bus stops:", err));
  }, []);

  // Helper to get latLng from bus stop location string (assuming "lat,lng" string)
  const getLatLngFromString = (loc) => {
    if (!loc) return null;
    const [latStr, lngStr] = loc.split(",");
    return [parseFloat(latStr), parseFloat(lngStr)];
  };

  // When user clicks show route button
  const fetchRoute = () => {
    setLoading(true);

    // In real apps, you'd fetch route points from an API or calculate here.
    // For demo, we use start and destination points from busStops if available,
    // or just draw line between startLocation and destination parsed latLng

    const startLatLng = getLatLngFromString(startLocation);
    const destLatLng = getLatLngFromString(destination);

    if (!startLatLng || !destLatLng) {
      alert("Start and Destination must be in 'lat,lng' format");
      setLoading(false);
      return;
    }

    // Example route points: start, some intermediate stops, destination
    const exampleRoute = [
      startLatLng,
      [51.515, -0.12], // intermediate example
      [51.52, -0.10], // intermediate example
      destLatLng,
    ];

    setRoutePoints(exampleRoute);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden p-8 border border-gray-200">
          <h3
            className="text-3xl font-extrabold text-center mb-6"
            style={{ color: "#191919" }}
          >
            🧭 SmartRoute: Live Map Navigator (Leaflet)
          </h3>

          <p className="text-center text-gray-600 mb-6">
            Plan and visualize your driving route between any two points with
            live map rendering using OpenStreetMap.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
            <input
              type="text"
              placeholder="Enter start location (lat,lng)..."
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter destination (lat,lng)..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm focus:outline-none"
            />
            <button
              onClick={fetchRoute}
              className="bg-[#191919] text-white px-6 py-3 rounded-md shadow-md hover:opacity-90 transition"
            >
              Show Route 📍
            </button>
          </div>

          {loading && (
            <p className="text-gray-600 text-center animate-pulse mb-4">
              Loading route...
            </p>
          )}

          <MapContainer
            center={[51.509865, -0.118092]} // London center
            zoom={13}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {routePoints.length > 0 && (
              <>
                <Polyline positions={routePoints} color="blue" />
                {routePoints.map((point, idx) => (
                  <Marker key={idx} position={point}>
                    <Popup>
                      {idx === 0
                        ? "Start"
                        : idx === routePoints.length - 1
                        ? "Destination"
                        : `Waypoint ${idx}`}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RouteMap;
