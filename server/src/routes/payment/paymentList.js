const PaymentService = require('../../services/PaymentService');

const paymentList = async (req, res) => {
  try {
    const userId = req.tokenInfo.id;
    const result = await PaymentService.getPayments(req.query, userId);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = paymentList;

/**
 * @swagger
 * paths:
 *  /v1/payment/list?sort=&order=&limit=&page=:
 *    get:
 *      summary: "결제 내역 조회"
 *      description: "Header Authorization에 Bearer token 정보 필요"
 *      tags: [Payment]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: sort
 *          required: false
 *          description: 정렬 기준. 빈 값이면 createdAt<br />createdAt, updatedAt ...
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          required: false
 *          description: 정렬 방법. 빈 값이면 desc<br />asc, desc
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
 *          description: 결제 내역 조회
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
 *                          "payments": [
 *                            {
 *                              "_id": "string",
 *                              "totalAmount": 0,
 *                              "method": "string",
 *                              "orderId": "string",
 *                              "orderName": "string",
 *                              "country": "string",
 *                              "receipt": "string",
 *                              "userId": "string",
 *                              "createdAt": "string",
 *                              "updatedAt": "string"
 *                            }
 *                          ],
 *                          totalPage: 1
 *                        }
 */
