import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import ThankYouPage from './pages/ThankYouPage';
import AboutUs from './pages/AboutUs';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import './index.css';

// Create the App component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Get the root element from the DOM
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a React root

// Render the app inside the root
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default App;
