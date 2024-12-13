import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const navigate = useNavigate();

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seat layout configuration (20 rows x 12 columns)
  const rows = 20;
  const columns = 12;

  // Toggle seat selection
  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat) // Deselect seat if already selected
        : [...prevSeats, seat] // Select seat
    );
  };

  // Redirect to payment page
  const handlePaymentRedirect = () => {
    if (selectedSeats.length > 0) {
      navigate("/payment", { state: { seats: selectedSeats } }); // Passing selected seats to the payment page
    } else {
      alert("Please select at least one seat.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Page</h1>

      {/* Seat Selection */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select Seats</h2>

        {/* Theater Seating Layout */}
        <div className="mt-6">
          {/* Loop over rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => {
            // Aisle between certain rows for theater effect (e.g., after row 10)
            const isAisle = rowIndex === 10; // Adjust this for the aisle position

            return (
              <div key={rowIndex} className="flex justify-center mb-2">
                {/* Add aisle spacing if needed */}
                {isAisle && <div className="w-8"></div>}

                {/* Loop over columns in each row */}
                {Array.from({ length: columns }).map((_, colIndex) => {
                  const seat = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`; // e.g., A1, A2, B1, etc.
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-10 h-10 rounded-md ${
                        isSelected ? "bg-green-500" : "bg-gray-300"
                      } text-white hover:bg-green-400`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Selected Seats:</h3>
        <ul>
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => <li key={seat}>{seat}</li>)
          ) : (
            <li>No seats selected.</li>
          )}
        </ul>
      </div>

      {/* Redirect to Payment Button */}
      <button
        onClick={handlePaymentRedirect}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default BookingPage;
