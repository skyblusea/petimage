const axios = require('axios');
const AlbumService = require('../../services/AlbumService');
const config = require('../../config/config');

const createAlbum = async (req, res) => {
  try {
    let body = req.body;
    if (!body.userId) body.userId = req.tokenInfo.id;

    const apiResult = await axios({
      url: `${config.aiServer}/petimage/v1/sd/${body.userId}`,
      method: 'post',
      headers: {
        access_token: config.aiToken,
        accept: 'application/json',
      },
      data: {
        userId: body.userId,
        imgLst: body.inputFiles,
        thpropmt: 'test',
        clsname: 'test',
      },
    });
    console.info(apiResult);

    const result = await AlbumService.postAlbum({ ...req.body, userId: body.userId });

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.error(e);
  }
};

module.exports = createAlbum;

/**
 * @swagger
 *
 * /v1/album/new:
 *  post:
 *    summary: "앨범 생성"
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
 *              themeName:
 *                type: string
 *                description: "테마 이름"
 *              inputFiles:
 *                type: array
 *                items:
 *                  type: string
 *                description: "사용자가 업로드 한 이미지"
 *              animal:
 *                type: string
 *                description: "동물 종류"
 *          example:
 *            themeName: "테마 이름"
 *            inputFiles: ["http://srulab.iptime.org:4002/uploads/cat.jpg", "http://srulab.iptime.org:4002/uploads/ring.jpg"]
 *            animal: "강아지"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: {}
 */
