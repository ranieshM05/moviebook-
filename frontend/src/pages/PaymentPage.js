import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Implement payment processing logic here
    console.log({
      cardNumber,
      expiryDate,
      cvv,
      phoneNumber,
      upiId,
      selectedPaymentMethod
    });

    // Redirect to Thank You page after successful payment
    navigate("/thank-you"); // Redirect to thank-you page
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="space-y-2">
          <label className="block font-medium">Select Payment Method:</label>
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        {selectedPaymentMethod === "card" && (
          <>
            <div className="space-y-2">
              <label className="block font-medium">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium">CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </>
        )}

        {selectedPaymentMethod === "upi" && (
          <div className="space-y-2">
            <label className="block font-medium">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="example@upi"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="1234567890"
            maxLength="10"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
