const express = require('express');
// const createAudio = require('./createAudio');
// const deleteAudio = require('./deleteAudio');
const animalList = require('./animalList');

const router = express.Router();

router.get('/list', animalList);
// router.post('/new', createAudio);
// router.delete('/:audioId', deleteAudio);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Animal
 *  description: 동물 종류
 */
