import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Login from "./components/Auth/Login"; // Import Login Component
import Register from "./components/Auth/Register"; // Import Register Component
import BookingPage from "./components/BookingPage";
import GetBookingList from "./components/GetBookingList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page Route */}
        <Route path="/login" element={<Login />} /> {/* Login Page Route */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Register Page Route */}
        <Route path="/book-flight/:flightId" element={<BookingPage />} />
        <Route path="/my-bookings" element={<GetBookingList />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home Page inside Layout */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
