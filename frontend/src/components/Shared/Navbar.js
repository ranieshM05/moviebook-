import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token to log out the user
    alert('You have been logged out.');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-center space-x-6">
        <Link
          to="/"
          className="text-white text-lg font-semibold hover:text-yellow-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white text-lg font-semibold hover:text-yellow-300"
        >
          About Us
        </Link>
        <Link
          to="/profile"
          className="text-white text-lg font-semibold hover:text-yellow-300"
        >
          Profile
        </Link>

        {/* Conditionally render Logout button if the user is logged in */}
        {localStorage.getItem('token') && (
          <button
            onClick={handleLogout}
            className="text-white text-lg font-semibold hover:text-yellow-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
