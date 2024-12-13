import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <Link 
                    to="/booking/:id" 
                    className="text-white text-lg font-semibold hover:text-yellow-300"
                >
                    Booking
                </Link>
                <Link 
                    to="/payment" 
                    className="text-white text-lg font-semibold hover:text-yellow-300"
                >
                    Payment
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
