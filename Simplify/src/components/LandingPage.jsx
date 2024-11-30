import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Simplify</h1>
      <p className="text-lg text-gray-700 mb-8">
        Simplify your travel with our seamless air ticket booking system. 
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
