const express = require('express');

const router = express.Router();
// const kakao = require('./kakao');
const refresh = require('./refresh');
const apple = require('./apple');
const deleteUser = require('./deleteUser');
const { verifyAccessToken } = require('../../middlewares/auth');
const google = require('./google');

// router.post('/kakao', kakao);
router.get('/refresh', refresh);
router.post('/google', google);
router.post('/apple', apple);
router.delete('/delete', verifyAccessToken, deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저
 */
