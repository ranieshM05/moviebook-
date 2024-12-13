const paypalClient = require('../config/paypal');

const createPayment = async (req, res) => {
  // Payment creation logic using PayPal SDK
  res.status(201).json({ message: 'Payment processed' });
};

module.exports = { createPayment };
