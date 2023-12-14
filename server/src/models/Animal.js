const mongoose = require('mongoose');
const { Schema } = mongoose;

const animalSchema = new Schema({
  name: String,
  class: String,
  code: String,
  img: String,
});

animalSchema.set('timestamps', true);
module.exports = mongoose.model('Animal', animalSchema);
