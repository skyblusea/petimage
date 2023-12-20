const express = require('express');

const router = express.Router();

const uploadFile = require('./uploadFile');
const uploadPet = require('./uploadPet');
const { multerUpload, petUpload } = require('../../middlewares/multer');
const deleteFile = require('./deleteFile');
const { verifyAccessToken } = require('../../middlewares/auth');

router.post('/delete', deleteFile);
router.post('/upload', verifyAccessToken, multerUpload.array('file'), uploadFile);
router.post('/pet', petUpload.array('file'), uploadPet);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: File
 *  description: 파일 업로드
 */
