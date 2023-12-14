const Payment = require('../models/Payment');

const getPayments = async (query, userId) => {
  const sort = query.sort && query.order ? { [query.sort]: query.order } : { createdAt: 'desc' };
  const limit = query.limit ? query.limit : 10;
  const page = query.page ? query.page : 1;
  const skip = limit * (page - 1);
  const total = await Payment.countDocuments({});
  const totalPage = Math.ceil(total / limit);
  const payments = await Payment.find({ userId }).sort(sort).skip(skip).limit(limit);

  return { payments, totalPage };
};

const postPayment = async (data) => {
  return await Payment.create(data);
};

module.exports = { getPayments, postPayment };
