const ThemeService = require('../../services/ThemeService');

const themeList = async (req, res) => {
  try {
    const result = await ThemeService.getThemes(req.query);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = themeList;

/**
 * @swagger
 * paths:
 *  /v1/theme/list:
 *    get:
 *      summary: "테마 조회"
 *      description: "sample: 테마 제작 결과물 예시, trial: 체험하기에 쓰일 정보"
 *      tags: [Theme]
 *      parameters:
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법(ASC/DESC)
 *          schema:
 *            type: string
 *        - in: query
 *          name: limit
 *          required: false
 *          description: 한 페이지에 표시될 개수. 빈 값이면 10
 *          schema:
 *            type: integer
 *        - in: query
 *          name: page
 *          required: false
 *          description: 페이지 num. 빈 값이면 1
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 테마 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    data:
 *                      type: object
 *                      example:
 *                        {
 *                          "themes": [
 *                            {
 *                              "_id": "string",
 *                              "prompt": "string",
 *                              "background": "string",
 *                              "sample": ["string", "string"],
 *                              "trial": [{}],
 *                              "name": "string",
 *                              "desc": "string",
 *                              "tag": "string",
 *                              "price": "string",
 *                              "type": "string",
 *                              "popular": 0,
 *                              "createdAt": "string",
 *                              "updatedAt": "string"
 *                            }
 *                          ],
 *                          totalPage: 1
 *                        }
 */
