const Album = require('../models/Album');
const config = require('../config/config');

const myAlbum = async (query, userId) => {
  let sort = query.sort && query.order ? { [query.sort]: query.order } : { createdAt: 'desc' };

  return await Album.find({ userId }).sort(sort).limit(parseInt(query.limit));
};

const postAlbum = async (data) => {
  // const petPath = data.inputFiles[0].replace('/uploads/', '/pet/').replace(/\/[^\/]*$/, '');
  // let outputArr = [];
  // for (var i = 1; i <= 30; i++) {
  //   outputArr.push(petPath + '/' + i + '.png');
  // }
  // data.outputFiles = outputArr;
  data.outputFiles = data.inputFiles;
  return await Album.create(data);
};

const postImage = async (data) => {
  let chkImg;
  if (data.length > 9) {
    chkImg = data.map((el, i) => {
      if (i === 0) return { url: el, check: false };
      else return { url: el, check: true };
    });
  } else {
    chkImg = data.map((el) => {
      return { url: el, check: true };
    });
  }

  return chkImg;
};

module.exports = { myAlbum, postAlbum, postImage };
