const express = require('express');
const { createPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/pay', createPayment);

module.exports = router;
