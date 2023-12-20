const Banner = require('../models/Banner');

const getBanners = async (query) => {
  const sort = query.sort && query.order ? { [query.sort]: query.order } : { createdAt: 'desc' };

  return await Banner.find({ status: 1 }).sort(sort);
};

module.exports = { getBanners };
