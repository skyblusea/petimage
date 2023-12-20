const Category = require('../models/Category');

const getCategory = async (query) => {
  const sort = query.sort && query.order ? { [query.sort]: query.order } : null;

  return await Category.find().sort(sort);
};

module.exports = { getCategory };
