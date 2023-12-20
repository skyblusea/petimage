const express = require('express');
const categoryList = require('./categoryList');
// const deleteBg = require('./deleteBg');
// const createBg = require('./createBg');

const router = express.Router();

router.get('/list', categoryList);
// router.post('/new', createBg);
// router.delete('/:bgId', deleteBg);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: 카테고리
 */
