const config = require('../../config/config');
const Album = require('../../models/Album');

const uploadPet = async (req, res) => {
  try {
    const { files } = req;
    if (files?.length > 0) {
      const urls = [];
      const destArr = files[0].destination.split('./pet/')[1];
      files.map(async (el) => {
        const result = {
          location: destArr + el.filename,
          fieldname: el.fieldname,
          originalname: el.originalname,
          encoding: el.encoding,
          mimetype: el.mimetype,
          size: el.size,
        };

        console.log('filePath??==>>', config.petUrl + result.location);
        urls.push(config.petUrl + result.location);
      });

      // await Album.findByIdAndUpdate(destArr.split('/')[0], { outputFiles: urls, status: 1 });
      res.status(200).json({ ok: true, data: urls });
    } else res.status(200).json({ ok: false, data: {} });
  } catch (e) {
    console.error(e);
  }
};

module.exports = uploadPet;

/**
 * @swagger
 *
 * /v1/file/pet?filePath=:
 *  post:
 *    summary: "파일 업로드(ai server)"
 *    description: "서버 pet 폴더에 파일을 업로드 함(ai server용)"
 *    tags: [File]
 *    parameters:
 *      - in: query
 *        name: filePath
 *        required: false
 *        description: "파일 경로(폴더 이름: album id)"
 *        schema:
 *          type: string
 *    consumes:
 *      - multipart/form-data
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: []
 */
