const express = require('express');
const paymentList = require('./paymentList');
const createPayment = require('./createPayment');
const { verifyAccessToken } = require('../../middlewares/auth');

const router = express.Router();

router.get('/list', verifyAccessToken, paymentList);
router.post('/new', verifyAccessToken, createPayment);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Payment
 *  description: 결제 내역
 */
