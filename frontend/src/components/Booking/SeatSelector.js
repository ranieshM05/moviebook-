import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SeatSelector({ seats, onSelect }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get movie data passed through the location state
  const movie = location.state?.movie;

  // Handle seat selection
  const handleSeatSelection = (seatId, isAvailable) => {
    const token = localStorage.getItem("token");

    // Check if the user is logged in
    if (!token) {
      alert("You need to log in to select seats.");
      navigate("/login");
    } 
    // Check if a movie is selected
    else if (!movie) {
      alert("Please select a movie first.");
      navigate("/"); // Redirect to the home page or movie selection
    } 
    // Proceed with seat selection if the seat is available
    else if (isAvailable) {
      onSelect(seatId);
    }
  };

  // Group seats by rows (assuming seats are numbered in order by rows)
  const rows = [];
  for (let i = 0; i < seats.length; i++) {
    const rowIndex = Math.floor(i / 5); // 5 seats per row (you can adjust this number)
    if (!rows[rowIndex]) {
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(seats[i]);
  }

  return (
    <div className="mt-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-4 mb-4">
          {row.map((seat) => (
            <div
              key={seat.id}
              className={`p-4 border rounded cursor-pointer ${
                seat.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => {
                // Prevent seat selection if not logged in
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("Please log in to select seats.");
                  navigate("/login"); // Redirect to login page
                } else {
                  handleSeatSelection(seat.id, seat.isAvailable);
                }
              }}
            >
              {seat.number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatSelector;
