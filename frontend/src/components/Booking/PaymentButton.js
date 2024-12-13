import React from "react";

function PaymentButton({ amount }) {
  const handlePayment = () => {
    // Implement payment logic here
  };

  return (
    <button onClick={handlePayment} className="bg-yellow-500 text-white p-2 rounded mt-4">
      Pay ${amount}
    </button>
  );
}

export default PaymentButton;
