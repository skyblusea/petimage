const AlbumService = require('../../services/AlbumService');

const albumList = async (req, res) => {
  try {
    const userId = req.tokenInfo.id;
    const result = await AlbumService.myAlbum(req.query, userId);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = albumList;

/**
 * @swagger
 * paths:
 *  /v1/album/list?sort=&order=&limit=&page=:
 *    get:
 *      summary: "보관함 목록 조회"
 *      description: "Header Authorization에 Bearer token 정보 필요"
 *      tags: [Album]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준. 빈 값이면 createdAt
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법(ASC/DESC). 빈 값이면 desc
 *          schema:
 *            type: string
 *        - in: query
 *          name: limit
 *          required: false
 *          description: 목록 개수
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 보관함 목록 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    data:
 *                      type: array
 *                      example:
 *                        [
 *                          {
 *                            "_id": "string",
 *                            "themeName": "string",
 *                            "inputFiles": [],
 *                            "outputFiles": [],
 *                            "userId": "string",
 *                            "animal": "string",
 *                            "createdAt": "string",
 *                            "updatedAt": "string"
 *                          }
 *                        ]
 */
