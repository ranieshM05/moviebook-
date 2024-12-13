const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  const { userId, showtimeId, seatIds } = req.body;
  const booking = await Booking.create({ user: userId, showtime: showtimeId, seats: seatIds });
  res.status(201).json(booking);
};

module.exports = { createBooking };
