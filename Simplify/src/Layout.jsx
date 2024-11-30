import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure layout spans full height */}
      <header>
        <Navbar /> {/* Navbar is in the header */}
      </header>
      <main className="flex-grow"> {/* Main content takes the remaining height */}
        <Outlet /> {/* Dynamic content from routes */}
      </main>
      <footer>
        <Footer /> {/* Footer stays at the bottom */}
      </footer>
    </div>
  );
};

export default Layout;
