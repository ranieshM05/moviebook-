import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentButton({ selectedSeats }) {
  const navigate = useNavigate();

  const seatPrice = 150; // Price per seat in Rupees
  const taxRate = 0.02; // 2% tax rate

  // Calculate the subtotal (price for selected seats)
  const subtotal = selectedSeats.length * seatPrice;

  // Calculate tax
  const tax = subtotal * taxRate;

  // Calculate the total amount (subtotal + tax)
  const totalAmount = subtotal + tax;

  const handlePayment = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in to proceed with the payment.");
      navigate("/login");
    } else {
      // Implement the payment logic here (e.g., integration with payment gateways)
      alert(`Payment process initiated. Total Amount: ₹${totalAmount.toFixed(2)}`);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax (2%): ₹{tax.toFixed(2)}</p>
        <p className="font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>
      <button onClick={handlePayment} className="bg-yellow-500 text-white p-2 rounded mt-4">
        Pay ₹{totalAmount.toFixed(2)}
      </button>
    </div>
  );
}

export default PaymentButton;
