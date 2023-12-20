const AnimalService = require('../../services/AnimalService');

const animalList = async (req, res) => {
  try {
    const result = await AnimalService.getAnimals(req.query);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = animalList;

/**
 * @swagger
 * paths:
 *  /v1/animal/list?sort=&order=&limit=:
 *    get:
 *      summary: "동물 목록 조회"
 *      description: ""
 *      tags: [Animal]
 *      parameters:
 *        - in: query
 *          name: class
 *          required: false
 *          description: 동물 종<br />강아지, 고양이
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준<br />name, code, class, createdAt, updatedAt
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법<br />asc, desc
 *          schema:
 *            type: string
 *        - in: query
 *          name: limit
 *          required: false
 *          description: 목록 개수
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 동물 목록 조회
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
 *                            "class": "string",
 *                            "code": "string",
 *                            "img": "string",
 *                            "createdAt": "string",
 *                            "updatedAt": "string"
 *                          }
 *                        ]
 */
