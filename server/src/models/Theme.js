const mongoose = require('mongoose');
const { Schema } = mongoose;

const themeSchema = new Schema({
  prompt: String,
  background: String,
  sample: [],
  trial: [{}],
  name: String,
  desc: String,
  tag: String,
  type: String,
  price: String,
  popular: {
    type: Number,
    default: 0,
  },
});

themeSchema.set('timestamps', true);
module.exports = mongoose.model('Theme', themeSchema);
