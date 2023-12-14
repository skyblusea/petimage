const config = require('../../config/config');

const uploadPet = async (req, res) => {
  try {
    const { files } = req;
    if (files?.length > 0) {
      const urls = [];
      files.map(async (el) => {
        const destArr = el.destination.split('./pet/');
        const result = {
          location: destArr[1] + el.filename,
          fieldname: el.fieldname,
          originalname: el.originalname,
          encoding: el.encoding,
          mimetype: el.mimetype,
          size: el.size,
        };

        console.log('filePath??==>>', config.petUrl + result.location);
        urls.push(config.petUrl + result.location);
      });
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
 *    description: "서버 pet 폴더에 파일을 업로드 함"
 *    tags: [File]
 *    parameters:
 *      - in: query
 *        name: filePath
 *        required: false
 *        description: "파일 경로(폴더 이름: user id) ex.656d5f1794d38c929257af9e"
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
