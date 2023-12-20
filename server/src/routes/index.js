const express = require('express');

const router = express.Router();

const userRouter = require('./user');
const fileRouter = require('./file');
const albumRouter = require('./album');
const paymentRouter = require('./payment');
const themeRouter = require('./theme');
const animalRouter = require('./animal');
const categoryRouter = require('./category');
const bannerRouter = require('./banner');

router.use('/banner', bannerRouter);
router.use('/category', categoryRouter);
router.use('/animal', animalRouter);
router.use('/theme', themeRouter);
router.use('/payment', paymentRouter);
router.use('/user', userRouter);
router.use('/album', albumRouter);
router.use('/file', fileRouter);

module.exports = router;
