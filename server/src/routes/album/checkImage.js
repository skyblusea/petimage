const AlbumService = require('../../services/AlbumService');

const checkImage = async (req, res) => {
  try {
    const result = await AlbumService.postImage(req.body.inputFiles);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = checkImage;

/**
 * @swagger
 *
 * /v1/album/check:
 *  post:
 *    summary: "이미지 유효성 검사"
 *    description: "Header Authorization에 Bearer token 정보 필요"
 *    tags: [Album]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              inputFiles:
 *                type: array
 *                description: "유효성 검사할 이미지 리스트"
 *          example:
 *            inputFiles: ["http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg", "http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg", "http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg", "http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg", "http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg"]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: [
 *                {
 *                  url: "string",
 *                  check: true
 *                }
 *              ]
 */
