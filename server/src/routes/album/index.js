const express = require('express');
const albumList = require('./albumList');
const createAlbum = require('./createAlbum');
const checkImage = require('./checkImage');
const { verifyAccessToken } = require('../../middlewares/auth');
// const projectDetail = require('./projectDetail');
// const editProject = require('./editProject');
// const deleteProject = require('./deleteProject');
// const projectInfo = require('./projectInfo');

const router = express.Router();
router.get('/list', verifyAccessToken, albumList);
router.post('/new', verifyAccessToken, createAlbum);
router.post('/check', verifyAccessToken, checkImage);
// router.post('/new/vf');
// router.get('/:id', projectDetail);
// router.put('/:id', editProject);
// router.delete('/:id', deleteProject);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Album
 *  description: 이미지 보관함
 */
