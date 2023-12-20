const CategoryService = require('../../services/CategoryService');

const categoryList = async (req, res) => {
  try {
    const result = await CategoryService.getCategory(req.query);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = categoryList;

/**
 * @swagger
 * paths:
 *  /v1/category/list:
 *    get:
 *      summary: "카테고리 조회"
 *      description: ""
 *      tags: [Category]
 *      parameters:
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준<br />name, price, popular, createdAt, updatedAt
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법<br />asc, desc
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 카테고리 조회
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
 *                            "name": "string",
 *                            "color": "string",
 *                            "createdAt": "string",
 *                            "updatedAt": "string"
 *                          }
 *                        ]
 */
