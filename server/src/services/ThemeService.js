const Theme = require('../models/Theme');

const getThemes = async (query) => {
  const sort = query.sort && query.order ? { [query.sort]: query.order } : null;
  const limit = query.limit ? query.limit : 10;
  const page = query.page ? query.page : 1;
  const skip = limit * (page - 1);
  const total = await Theme.countDocuments({});
  const totalPage = Math.ceil(total / limit);
  const category = query.category ? { category: { $in: [query.category] } } : null;

  const themes = await Theme.find(category).sort(sort).skip(skip).limit(limit);

  return { themes, totalPage };
};

const getTheme = async (themeId) => {
  return await Theme.findById(themeId);
};

module.exports = { getThemes, getTheme };
