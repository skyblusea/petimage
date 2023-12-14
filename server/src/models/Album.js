const mongoose = require('mongoose');
const User = require('./User');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const albumSchema = new Schema({
  themeName: String,
  inputFiles: [],
  outputFiles: [],
  userId: ObjectId,
  animal: String,
});

albumSchema.set('timestamps', true);
module.exports = mongoose.model('Album', albumSchema);
