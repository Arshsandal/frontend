// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// // Leaflet marker icon config
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Routing component
// const RoutingMachine = ({ waypoints }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!waypoints || waypoints.length < 2) return;

//     const routingControl = L.Routing.control({
//       waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
//       lineOptions: {
//         styles: [{ color: "indigo", weight: 6 }],
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       showAlternatives: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [waypoints, map]);

//   return null;
// };

// // Helper: get destination coords from NaptanId or fallback to searching by name
// async function getDestinationCoords(destinationNaptanId, destinationName) {
//   try {
//     if (destinationNaptanId) {
//       // Fetch from StopPoint API by NaptanId
//       const stopRes = await axios.get(
//         `https://api.tfl.gov.uk/StopPoint/${destinationNaptanId}`
//       );
//       return [stopRes.data.lat, stopRes.data.lon];
//     } else if (destinationName) {
//       // Search stops by name
//       const searchRes = await axios.get(
//         `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(destinationName)}`
//       );
//       const matches = searchRes.data.matches;
//       if (matches.length > 0) {
//         // Take first match's details
//         const stopDetailsRes = await axios.get(
//           `https://api.tfl.gov.uk/StopPoint/${matches[0].id}`
//         );
//         return [stopDetailsRes.data.lat, stopDetailsRes.data.lon];
//       } else {
//         throw new Error("No matching stop found for destination name");
//       }
//     } else {
//       throw new Error("No destination NaptanId or Name provided");
//     }
//   } catch (error) {
//     console.error("Error fetching destination coordinates:", error);
//     return null;
//   }
// }

// const TripDetail = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [originCoords, setOriginCoords] = useState(null);
//   const [destCoords, setDestCoords] = useState(null);
//   const [loadingMap, setLoadingMap] = useState(true);
//   const [mapError, setMapError] = useState(null);

//   useEffect(() => {
//     if (state) {
//       toast.info(`Showing details for Line ${state.lineName}`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   }, [state]);

//   useEffect(() => {
//     const fetchCoords = async () => {
//       setLoadingMap(true);
//       setMapError(null);

//       try {
//         // Get origin coordinates from local API/localStorage
//         const naptanId = localStorage.getItem("Naptan Id");
//         if (!naptanId) {
//           setMapError("Naptan ID not found in localStorage.");
//           setLoadingMap(false);
//           return;
//         }

//         const originRes = await axios.get(
//           `https://backend-5ofy.onrender.com/api/auth/getLatLon/${naptanId}`
//         );
//         const origin = [originRes.data.lat, originRes.data.lon];
//         setOriginCoords(origin);

//         // Get arrivals for your bus lines
//         const arrivalsRes = await axios.get(
//           `https://api.tfl.gov.uk/Line/24,73,159/Arrivals?sort=timeToStation`
//         );

//         // Find the arrival for your selected vehicleId or line, or fallback to first arrival
//         // Here, matching vehicleId from state or just first arrival for demo
//         let arrival = null;
//         if (state.vehicleId) {
//           arrival = arrivalsRes.data.find((a) => a.vehicleId === state.vehicleId);
//         }
//         if (!arrival && arrivalsRes.data.length > 0) {
//           arrival = arrivalsRes.data[0];
//         }
//         if (!arrival) {
//           setMapError("No arrivals found.");
//           setLoadingMap(false);
//           return;
//         }

//         // Get destination coords by NaptanId or destinationName fallback
//         const destinationCoords = await getDestinationCoords(
//           arrival.destinationNaptanId,
//           arrival.destinationName
//         );

//         if (!destinationCoords) {
//           setMapError("Could not find destination coordinates.");
//           setLoadingMap(false);
//           return;
//         }

//         setDestCoords(destinationCoords);
//       } catch (err) {
//         console.error(err);
//         setMapError("Failed to load map coordinates.");
//       } finally {
//         setLoadingMap(false);
//       }
//     };

//     fetchCoords();
//   }, [state]);

//   if (!state) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
//         <p className="text-red-600 text-xl mb-4 animate-pulse font-semibold">
//           No trip data available. Please go back.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Go Back
//         </button>
//         <ToastContainer />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen p-10 bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 flex flex-col items-center">
//         <ToastContainer />
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-6 text-indigo-700 hover:text-indigo-900 font-semibold transition"
//         >
//           ← Back to Tracker
//         </button>

//         <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-indigo-200">
//           <h1 className="text-5xl font-extrabold mb-8 text-indigo-900">
//             Line {state.lineName} Details
//           </h1>

//           <DetailRow label="Current Station" value={state.stationName} />
//           <DetailRow label="Destination" value={state.destination} />
//           <DetailRow label="Platform" value={state.platformName || "N/A"} />
//           <DetailRow
//             label="Arrival Time"
//             value={
//               state.expectedArrival
//                 ? new Date(state.expectedArrival).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })
//                 : "N/A"
//             }
//           />
//           <DetailRow
//             label="Time to Station"
//             value={
//               typeof state.timeToStation === "number"
//                 ? `${(state.timeToStation / 60).toFixed(1)} minutes`
//                 : "N/A"
//             }
//           />
//           <DetailRow label="Vehicle ID" value={state.vehicleId || "N/A"} />
//           <DetailRow label="Naptan ID" value={state.naptanId || "N/A"} />
//         </div>

//         {/* MAP */}
//         <div className="max-w-3xl w-full h-96 mt-10 rounded-3xl overflow-hidden shadow-lg border border-indigo-300">
//           {loadingMap ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-600 animate-pulse">Loading map...</p>
//             </div>
//           ) : mapError ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-red-600">{mapError}</p>
//             </div>
//           ) : originCoords && destCoords ? (
//             <MapContainer
//               center={originCoords}
//               zoom={13}
//               scrollWheelZoom={false}
//               style={{ height: "100%", width: "100%" }}
//             >
//               <TileLayer
//                 attribution='&copy; OpenStreetMap contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <Marker position={originCoords}>
//                 <Popup>Current Location</Popup>
//               </Marker>
//               <Marker position={destCoords}>
//                 <Popup>Destination</Popup>
//               </Marker>
//               <RoutingMachine waypoints={[originCoords, destCoords]} />
//             </MapContainer>
//           ) : null}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const DetailRow = ({ label, value }) => (
//   <p className="text-xl mb-4 font-medium text-indigo-800">
//     <span className="font-semibold">{label}:</span> {value}
//   </p>
// );

// export default TripDetail;




import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Leaflet marker icon config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Routing component
const RoutingMachine = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!waypoints || waypoints.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
      lineOptions: {
        styles: [{ color: "indigo", weight: 6 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [waypoints, map]);

  return null;
};

// Helper to get destination coords
async function getDestinationCoords(destinationNaptanId, destinationName) {
  try {
    if (destinationNaptanId) {
      const stopRes = await axios.get(
        `https://api.tfl.gov.uk/StopPoint/${destinationNaptanId}`
      );
      return [stopRes.data.lat, stopRes.data.lon];
    } else if (destinationName) {
      const searchRes = await axios.get(
        `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(destinationName)}`
      );
      const matches = searchRes.data.matches;
      if (matches.length > 0) {
        const stopDetailsRes = await axios.get(
          `https://api.tfl.gov.uk/StopPoint/${matches[0].id}`
        );
        return [stopDetailsRes.data.lat, stopDetailsRes.data.lon];
      } else {
        throw new Error("No matching stop found for destination name");
      }
    } else {
      throw new Error("No destination NaptanId or Name provided");
    }
  } catch (error) {
    console.error("Error fetching destination coordinates:", error);
    return null;
  }
}

const TripDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [originCoords, setOriginCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (state) {
      toast.info(`Showing details for Line ${state.lineName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [state]);

  useEffect(() => {
    const fetchCoords = async () => {
      setLoadingMap(true);
      setMapError(null);

      try {
        const naptanId = localStorage.getItem("Naptan Id");
        if (!naptanId) {
          setMapError("Naptan ID not found in localStorage.");
          setLoadingMap(false);
          return;
        }

        const originRes = await axios.get(
          `https://backend-5ofy.onrender.com/api/auth/getLatLon/${naptanId}`
        );
        const origin = [originRes.data.lat, originRes.data.lon];
        setOriginCoords(origin);

        const arrivalsRes = await axios.get(
          `https://api.tfl.gov.uk/Line/24,73,159/Arrivals?sort=timeToStation`
        );

        let arrival = null;
        if (state.vehicleId) {
          arrival = arrivalsRes.data.find((a) => a.vehicleId === state.vehicleId);
        }
        if (!arrival && arrivalsRes.data.length > 0) {
          arrival = arrivalsRes.data[0];
        }
        if (!arrival) {
          setMapError("No arrivals found.");
          setLoadingMap(false);
          return;
        }

        const destinationCoords = await getDestinationCoords(
          arrival.destinationNaptanId,
          arrival.destinationName
        );

        if (!destinationCoords) {
          setMapError("Could not find destination coordinates.");
          setLoadingMap(false);
          return;
        }

        setDestCoords(destinationCoords);
      } catch (err) {
        console.error(err);
        setMapError("Failed to load map coordinates.");
      } finally {
        setLoadingMap(false);
      }
    };

    fetchCoords();
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <p className="text-red-600 text-xl mb-4 animate-pulse font-semibold">
          No trip data available. Please go back.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 flex flex-col">
        <ToastContainer />
        <button
          onClick={() => navigate(-1)}
          className="m-4 text-indigo-700 hover:text-indigo-900 font-semibold transition self-start"
        >
          ← Back to Tracker
        </button>

        <div className="flex flex-1">
          {/* Left: Trip Details */}
          <div className="w-1/4 p-6 bg-white border-r border-indigo-200 shadow-md overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">
              Line {state.lineName} Details
            </h1>
            <DetailRow label="Current Station" value={state.stationName} />
            <DetailRow label="Destination" value={state.destination} />
            <DetailRow label="Platform" value={state.platformName || "N/A"} />
            <DetailRow
              label="Arrival Time"
              value={
                state.expectedArrival
                  ? new Date(state.expectedArrival).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"
              }
            />
            <DetailRow
              label="Time to Station"
              value={
                typeof state.timeToStation === "number"
                  ? `${(state.timeToStation / 60).toFixed(1)} minutes`
                  : "N/A"
              }
            />
            <DetailRow label="Vehicle ID" value={state.vehicleId || "N/A"} />
            <DetailRow label="Naptan ID" value={state.naptanId || "N/A"} />
          </div>

          {/* Right: Map */}
          <div className="w-3/4 h-[calc(100vh-100px)]">
            {loadingMap ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 animate-pulse">Loading map...</p>
              </div>
            ) : mapError ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-600">{mapError}</p>
              </div>
            ) : originCoords && destCoords ? (
              <MapContainer
                center={originCoords}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={originCoords}>
                  <Popup>Current Location</Popup>
                </Marker>
                <Marker position={destCoords}>
                  <Popup>Destination</Popup>
                </Marker>
                <RoutingMachine waypoints={[originCoords, destCoords]} />
              </MapContainer>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const DetailRow = ({ label, value }) => (
  <p className="text-lg mb-3 font-medium text-indigo-800">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export default TripDetail;
