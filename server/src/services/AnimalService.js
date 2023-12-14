const Animal = require('../models/Animal');

const getAnimals = async (query) => {
  let find = query.class ? { class: query.class } : null;
  let sort = query.sort && query.order ? { [query.sort]: query.order } : null;
  return await Animal.find(find).sort(sort).limit(parseInt(query.limit));
};

module.exports = { getAnimals };
