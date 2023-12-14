const mongoose = require('mongoose');
const User = require('./User');
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const paymentSchema = new Schema({
  totalAmount: Number,
  method: String,
  orderId: String,
  orderName: String,
  country: String,
  receipt: String,
  userId: ObjectId,
});

paymentSchema.set('timestamps', true);
module.exports = mongoose.model('Payment', paymentSchema);
