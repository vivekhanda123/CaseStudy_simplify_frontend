import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 FlightBooking. All rights reserved.</p>
        <p className="text-sm">Contact us at: <a href="mailto:support@flightbooking.com" className="text-blue-400 hover:underline">support@flightbooking.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
