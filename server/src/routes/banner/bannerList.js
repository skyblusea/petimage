const BannerService = require('../../services/BannerService');

const bannerList = async (req, res) => {
  try {
    const result = await BannerService.getBanners(req.query);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = bannerList;

/**
 * @swagger
 * paths:
 *  /v1/banner/list:
 *    get:
 *      summary: "배너 조회"
 *      description: "기본적으로 status가 1인 항목만 조회<br />type: theme, event..의 값이 들어갈 건데 일단은 theme만 사용<br />info: type이 theme일 경우 themeId가 들어감"
 *      tags: [Banner]
 *      parameters:
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준/ 빈 값이면 createdAt<br />type, createdAt, updatedAt
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법. 빈 값이면 desc<br />asc, desc
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 배너 조회
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
 *                            "status": "string",
 *                            "img": "string",
 *                            "type": "string",
 *                            "info": "string",
 *                            "createdAt": "string",
 *                            "updatedAt": "string"
 *                          }
 *                        ]
 */
