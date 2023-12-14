const PaymentService = require('../../services/PaymentService');

const createPayment = async (req, res) => {
  try {
    let body = req.body;
    console.log(req.tokenInfo);
    if (!body.userId) body.userId = req.tokenInfo.id;
    const result = await PaymentService.postPayment(body);

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = createPayment;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    refreshAuth:
 *      type: apiKey
 *      in: header
 *      name: Refresh
 * paths:
 *  /v1/payment/new:
 *    post:
 *      summary: "결제 내역 생성"
 *      description: "Header Authorization에 Bearer token 정보 필요"
 *      tags: [Payment]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: ""
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                method:
 *                  type: string
 *                  description: "결제 방법"
 *                orderId:
 *                  type: string
 *                  description: "주문 id"
 *                orderName:
 *                  type: string
 *                  description: "주문 이름"
 *                country:
 *                  type: string
 *                  description: "국가"
 *                totalAmount:
 *                  type: integer
 *                  description: "총 금액"
 *                receipt:
 *                  type: string
 *                  description: "영수증"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              example:
 *                ok: true
 *                data: {}
 */
