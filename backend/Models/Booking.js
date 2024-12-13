const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'booked' },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
