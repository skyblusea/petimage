const express = require('express');
const themeList = require('./themeList');
const selectTheme = require('./selectTheme');
// const deleteBg = require('./deleteBg');
// const createBg = require('./createBg');

const router = express.Router();

router.get('/list', themeList);
router.get('/:id', selectTheme);
// router.post('/new', createBg);
// router.delete('/:bgId', deleteBg);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Theme
 *  description: 테마
 */
