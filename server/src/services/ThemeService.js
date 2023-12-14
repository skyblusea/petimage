const Theme = require('../models/Theme');

const getThemes = async (query) => {
  const sort = query.sort && query.order ? { [query.sort]: query.order } : null;
  const limit = query.limit ? query.limit : 10;
  const page = query.page ? query.page : 1;
  const skip = limit * (page - 1);
  const total = await Theme.countDocuments({});
  const totalPage = Math.ceil(total / limit);
  const themes = await Theme.find().sort(sort).skip(skip).limit(limit);

  return { themes, totalPage };
};

module.exports = { getThemes };
