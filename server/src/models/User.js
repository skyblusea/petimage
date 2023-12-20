const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  provider: String,
  providerId: String,
  status: {
    type: Number,
    default: 1,
  },
  refresh: String,
});

userSchema.set('timestamps', true);
module.exports = mongoose.model('User', userSchema);
