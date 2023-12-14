const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const moment = require('moment');
const now = Date.now();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = './uploads/';
    const now = moment(req._startTime).format('MMDDHHmmss');
    if (req.query.filePath) dir = dir + req.query.filePath + '/' + now + '/';
    // else dir = dir + 'admin' + '/' + folderDate + '/';

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    return crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) {
        cb(err);
      }
      const fileName = Date.now();
      const extension = path.extname(file.originalname);

      cb(null, fileName + extension);
    });
  },
});

const pet = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = './pet/';

    if (req.query.filePath) dir = dir + req.query.filePath + '/';
    // else dir = dir + 'admin' + '/' + folderDate + '/';

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    return crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) {
        cb(err);
      }
      cb(null, file.originalname);
    });
  },
});

const multerUpload = multer({ storage: storage });
const petUpload = multer({ storage: pet });

// let remove = function (req, res, next) {
//   let params = {
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: req.body.file.key
//   };
//   s3.deleteObject(params, function (err, data) {
//     if (err) {
//       console.log(err, err.stack);
//       req.err = err
//       next(createError(500))
//     } // error
//     else {
//       console.log('파일 삭제됨.');
//       req.err = null
//       req.remove = 'success'
//       next();
//     } // deleted
//   });
// };

module.exports = {
  multerUpload,
  petUpload,
};
