const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  status: { type: String, enum: ['available', 'booked', 'reserved'], default: 'available' },
});

module.exports = mongoose.model('Seat', seatSchema);
