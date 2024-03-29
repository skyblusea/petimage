const axios = require('axios');
const UserService = require('../../services/UserService');
const jwt = require('jsonwebtoken');

const apple = async (req, res) => {
  try {
    const userInfo = {
      name: req.body.name,
      email: req.body.email,
      info: jwt.decode(req.body.token),
    };
    const result = await UserService.signInApple(userInfo);
    return res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = apple;

/**
 * @swagger
 *
 * /v1/user/apple:
 *  post:
 *    summary: "애플 로그인"
 *    description: "토큰으로 애플에서 사용자 정보(이름, 이메일, 애플 providerId)를 받은 뒤 DB에 해당 유저가 존재하는지 조회<br />없으면 DB에 저장<br />유저 정보와 JWT 토큰 반환"
 *    tags: [User]
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                description: "애플 로그인 토큰"
 *              name:
 *                type: string
 *                description: "사용자 이름"
 *              email:
 *                type: string
 *                description: "사용자 이메일"
 *    responses:
 *      "200":
 *        description: 유저 정보와 access, refresh 토큰 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  ok:
 *                    type: boolean
 *                  data:
 *                    type: object
 *                    example:
 *                      {
 *                        "user": {},
 *                        "accessToken": "string",
 *                        "refreshToken": "string",
 *                      }
 */
