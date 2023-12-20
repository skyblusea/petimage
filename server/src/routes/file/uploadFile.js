const config = require('../../config/config');

const uploadFile = async (req, res) => {
  try {
    const { files } = req;
    if (files?.length > 0) {
      const urls = [];
      files.map(async (el) => {
        const destArr = el.destination.split('./uploads/');
        const result = {
          location: destArr[1] + el.filename,
          fieldname: el.fieldname,
          originalname: el.originalname,
          encoding: el.encoding,
          mimetype: el.mimetype,
          size: el.size,
        };

        console.log('filePath??==>>', config.fileUrl + result.location);
        urls.push(config.fileUrl + result.location);
      });
      res.status(200).json({ ok: true, data: urls });
    } else res.status(200).json({ ok: false, data: {} });
  } catch (e) {
    console.error(e);
  }
};

module.exports = uploadFile;

/**
 * @swagger
 *
 * /v1/file/upload?filePath=:
 *  post:
 *    summary: "파일 업로드(client)"
 *    description: "Header Authorization에 Bearer token 정보 필요(userId를 참조하여 폴더 생성함)<br /><br />서버 uploads 폴더에 파일을 업로드 함"
 *    tags: [File]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: filePath
 *        required: false
 *        description: "파일 경로"
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
