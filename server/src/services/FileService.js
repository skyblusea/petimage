const File = require('../models/File');

const postFile = async (data) => {
  return await File.create(data);
};

const delFile = async (id) => {
  return await File.destroy({ where: { id } });
};

module.exports = { postFile, delFile, putFile };
