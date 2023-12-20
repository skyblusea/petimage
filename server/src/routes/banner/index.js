const express = require('express');
const bannerList = require('./bannerList');
// const deleteBg = require('./deleteBg');
// const createBg = require('./createBg');

const router = express.Router();

router.get('/list', bannerList);
// router.post('/new', createBg);
// router.delete('/:bgId', deleteBg);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Banner
 *  description: 배너
 */
