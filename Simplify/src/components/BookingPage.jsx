import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/BookingPage.css'; // Import the CSS file

const BookingPage = () => {
  const { flightId } = useParams(); // Get the flightId from the URL
  const [flight, setFlight] = useState(null); // Flight data from the backend
  const [selectedSeats, setSelectedSeats] = useState([]); // Store selected seat numbers
  const [error, setError] = useState(""); // To display errors
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation after booking

  // Fetch flight details including available seats
  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7136/api/Flight/GetFlightDetails/${flightId}`);
        setFlight(response.data);
      } catch (err) {
        setError("Failed to fetch flight details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    if (seat.isAvailable) {
      if (selectedSeats.includes(seat.seatNumber)) {
        // Deselect seat
        setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
      } else {
        // Select seat
        setSelectedSeats([...selectedSeats, seat.seatNumber]);
      }
    }
  };

  // Handle booking process
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError("Please select at least one seat.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    const bookingData = {
      flightId,
      numberOfSeats: selectedSeats.length,
      selectedSeats, // Send the selected seats
    };

    // Assuming you have the JWT token stored in localStorage/sessionStorage
    const token = localStorage.getItem('authToken'); // or sessionStorage.getItem('authToken');
    console.log('JWT Token:', token);

    try {
      const response = await axios.post("https://localhost:7136/api/Booking/BookTicket", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in Authorization header
        },
      });

      if (response.status === 200) {
        navigate("/my-bookings"); // Redirect after successful booking
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      // Handle different errors here
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Booking failed. Please try again.");
      } else {
        setError("Booking failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading flight details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  if (!flight) return <div>No flight data available.</div>;

  return (
    <div className="container">
      <h2>Booking Flight {flight.flightNumber}</h2>
      <div className="bg-white">
        <p><strong>Origin:</strong> {flight.origin}</p>
        <p><strong>Destination:</strong> {flight.destination}</p>
        <p><strong>Departure Date:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
        <p><strong>Price per Seat:</strong> ₹{flight.pricePerSeat.toFixed(2)}</p>

        <div className="mt-4 mb-6">
          <h3>Available Seats:</h3>
          <div className="grid">
            {flight.flightSeats.$values.map((seat) => (
              <button
                key={seat.flightSeatId}
                className={`seat-icon ${seat.isAvailable ? "available" : "unavailable"} p-2 text-center cursor-pointer ${selectedSeats.includes(seat.seatNumber) ? "selected" : ""}`}
                onClick={() => toggleSeatSelection(seat)}
                disabled={!seat.isAvailable} // Disable the button if the seat is unavailable
              >
                <div className={`seat ${selectedSeats.includes(seat.seatNumber) ? "selected" : ""}`}>
                  {seat.seatNumber}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleBooking} className="mt-4">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
