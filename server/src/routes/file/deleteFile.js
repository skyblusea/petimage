const fs = require('fs');
const path = require('path');
const config = require('../../config/config');

const deleteFile = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    if (fileUrl) {
      const fileName = fileUrl.split('uploads/')[1];
      const localpath = path.join(__dirname, '../../..', 'uploads', fileName);
      fs.unlink(localpath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`${fileUrl} unlink err: ${unlinkErr}`);
          return;
        }
        console.log(`${fileUrl} unlinked`);
        res.status(200).json({ ok: true, data: fileUrl });
      });
    } else {
      res.status(200).json({ ok: false, data: 'no file' });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = deleteFile;

/**
 * @swagger
 *
 * /v1/file/delete:
 *  post:
 *    summary: "파일 삭제"
 *    description: "서버 uploads 폴더에 저장된 파일을 삭제"
 *    tags: [File]
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fileUrl:
 *                type: string
 *                description: "파일 url"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: string
 */
