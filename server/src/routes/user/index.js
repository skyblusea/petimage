const express = require('express');

const router = express.Router();
const kakao = require('./kakao');
const refresh = require('./refresh');
const apple = require('./apple');

router.post('/kakao', kakao);
router.get('/refresh', refresh);
router.post('/apple', apple);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저
 */
