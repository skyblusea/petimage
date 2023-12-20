const axios = require('axios');
const UserService = require('../../services/UserService');

const google = async (req, res) => {
  try {
    const { token } = req.body;
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userInfo) res.status(200).json({ ok: false, data: 'sns auth error' });
    else {
      const result = await UserService.signInGoogle(userInfo.data);
      return res.status(200).json({ ok: true, data: result });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = google;

/**
 * @swagger
 *
 * /v1/user/google:
 *  post:
 *    summary: "구글 로그인"
 *    description: "토큰으로 구글에서 사용자 정보를 받은 뒤 DB에 해당 유저가 존재하는지 조회<br />없으면 DB에 저장<br />유저 정보와 JWT 토큰 반환"
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
 *                description: "구글 로그인 토큰"
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
