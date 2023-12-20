const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  color: String,
});

categorySchema.set('timestamps', true);
module.exports = mongoose.model('Category', categorySchema);
