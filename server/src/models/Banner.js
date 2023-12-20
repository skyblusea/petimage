const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = new Schema({
  status: Number,
  img: String,
  type: String,
  info: String,
});

bannerSchema.set('timestamps', true);
module.exports = mongoose.model('Banner', bannerSchema);
