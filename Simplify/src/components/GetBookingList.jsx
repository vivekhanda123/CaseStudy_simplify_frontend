import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for the API request
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Assume `flightOwnerId` is stored in localStorage
        const flightOwnerId = localStorage.getItem("flightOwnerId");
        const token = localStorage.getItem("token");

        // Fetch bookings for the flight owner using the flightOwnerId
        const response = await axios.get("https://localhost:7136/api/Booking/ListAllBooking", {
          params: { flightOwnerId },
          headers: {
            Authorization: `Bearer ${token}`, // Add the token for authentication
          },
        });

        // Access the `$values` array from the response and set bookings
        setBookings(response.data.$values); // This accesses the actual bookings array
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false); // Stop loading after API call
      }
    };

    fetchBookings(); // Call the fetchBookings function when the component is mounted
  }, []);

  const handleBookingClick = (bookingId) => {
    // Navigate to the details page of the booking if needed
    navigate(`/booking-details/${bookingId}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar or Header */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded">
        <h1 className="text-2xl font-bold">Your Bookings</h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <div>Loading bookings...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display Bookings Table */}
      {!loading && !error && bookings.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Booking List</h2>
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Booking ID</th>
                <th className="border px-4 py-2">Flight Number</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Seats</th>
                <th className="border px-4 py-2">Total Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleBookingClick(booking.bookingId)}
                >
                  <td className="border px-4 py-2">{booking.bookingId}</td>
                  <td className="border px-4 py-2">{booking.flightNumber}</td>
                  <td className="border px-4 py-2">{booking.userName}</td>
                  <td className="border px-4 py-2">{booking.numberOfSeats}</td>
                  <td className="border px-4 py-2">₹{booking.totalPrice.toFixed(2)}</td>
                  <td className="border px-4 py-2">{booking.status}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* No Bookings Message */}
      {!loading && !error && bookings.length === 0 && (
        <div className="text-center text-gray-600">
          <p>No bookings available for this flight owner.</p>
        </div>
      )}
    </div>
  );
};

export default GetBookingList;
