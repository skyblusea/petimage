const express = require('express');
const themeList = require('./themeList');
// const deleteBg = require('./deleteBg');
// const createBg = require('./createBg');

const router = express.Router();

router.get('/list', themeList);
// router.post('/new', createBg);
// router.delete('/:bgId', deleteBg);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Theme
 *  description: 테마
 */
