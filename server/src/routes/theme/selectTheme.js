const ThemeService = require('../../services/ThemeService');

const selectTheme = async (req, res) => {
  try {
    const result = await ThemeService.getTheme(req.params.id);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = selectTheme;

/**
 * @swagger
 * paths:
 *  /v1/theme/{id}:
 *    get:
 *      summary: "테마 id로 조회"
 *      description: ""
 *      tags: [Theme]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: "theme id<br />ex)657953f6ed59584aa4b2c983"
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 테마 id로 조회
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
 *                          "_id": "string",
 *                          "prompt": "string",
 *                          "background": "string",
 *                          "sample": ["string", "string"],
 *                          "trial": [{}],
 *                          "name": "string",
 *                          "desc": "string",
 *                          "tag": "string",
 *                          "price": "string",
 *                          "type": "string",
 *                          "category": [],
 *                          "popular": 0,
 *                          "amount": 30,
 *                          "createdAt": "string",
 *                          "updatedAt": "string"
 *                        }
 */
