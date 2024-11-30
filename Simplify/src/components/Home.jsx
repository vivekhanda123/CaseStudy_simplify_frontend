import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [role, setRole] = useState(""); // Admin, FlightOwner, User
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // For Modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = () => {
      // Mock fetch role - Replace with actual role fetching logic
      const userRole = localStorage.getItem("role");
      setRole(userRole || "User");
    };

    fetchUserRole();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("https://localhost:7136/api/Flight/SearchFlights", {
        params: { origin, destination, date },
      });

      const data = response.data["$values"] || [];

      if (data.length === 0) {
        setError("No flights found based on your search criteria.");
        setIsModalOpen(true); // Open the modal when no flights are found
      } else {
        setFlights(data);
        setError(""); // Clear any previous error message
      }
    } catch (err) {
      setError("Failed to fetch flights. Please check your input or try again later.");
      setIsModalOpen(true); // Show error in modal if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBookingsRedirect = () => {
    navigate("/my-bookings");
  };

  const handleFlightClick = (flightId) => {
    navigate(`/book-flight/${flightId}`); // Navigate to booking page with flightId
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar with Search and Logout */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded">
        <h1 className="text-2xl font-bold">Welcome to AirTicket Booking</h1>
        <div className="flex space-x-4">
          <button onClick={handleBookingsRedirect} className="bg-green-500 text-white px-4 py-2 rounded">
            Your Bookings
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Search Flights Section */}
      <div className="search-flights-container bg-gray-100 p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
        <form onSubmit={handleSearch} className="grid gap-4">
          <div className="form-group">
            <label className="block mb-2">Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>
      </div>

      {/* Loading and Error States */}
      {loading && <div>Loading flights...</div>}

      {/* Flights List: Only show if there are flights */}
      {flights.length > 0 && (
        <section className="flights-container mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flights.map((flight) => (
              <div
                key={flight.flightId}
                onClick={() => handleFlightClick(flight.flightId)} // Make it clickable
                className="p-4 border rounded shadow bg-white cursor-pointer hover:bg-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">Flight {flight.flightNumber}</h3>
                <p>
                  <strong>Origin:</strong> {flight.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {flight.destination}
                </p>
                <p>
                  <strong>Departure:</strong> {new Date(flight.departureDate).toLocaleString()}
                </p>
                <p>
                  <strong>Seats Available:</strong> {flight.availableSeats}
                </p>
                <p>
                  <strong>Price per Seat:</strong> ₹{flight.pricePerSeat.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal for Error */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p>{error}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
