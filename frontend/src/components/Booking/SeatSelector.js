import React from "react";

function SeatSelector({ seats, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`p-2 border rounded cursor-pointer ${
            seat.isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
          onClick={() => seat.isAvailable && onSelect(seat.id)}
        >
          {seat.number}
        </div>
      ))}
    </div>
  );
}

export default SeatSelector;
