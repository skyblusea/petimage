const axios = require('axios');
const UserService = require('../../services/UserService');

const kakao = async (req, res) => {
  try {
    // const headers = req.headers['authorization'];
    // const kakaoToken = headers.split(' ')[1];
    const kakao = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
      },
    });

    if (!kakao) res.status(200).json({ ok: false, data: 'kakao auth error' });
    else {
      const result = await UserService.signInKakao(kakao.data);
      return res.status(200).json({ ok: true, data: result });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = kakao;

// /**
//  * @swagger
//  *
//  * /v1/user/kakao:
//  *  post:
//  *    summary: "카카오 로그인"
//  *    description: "토큰으로 카카오에서 사용자 정보(이름, 이메일, 카카오 providerId)를 받은 뒤 DB에 해당 유저가 존재하는지 조회<br />없으면 DB에 저장<br />유저 정보와 JWT 토큰 반환"
//  *    tags: [User]
//  *    requestBody:
//  *      description: ""
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              token:
//  *                type: string
//  *                description: "카카오 로그인 토큰"
//  *    responses:
//  *      "200":
//  *        description: 유저 정보와 access, refresh 토큰 반환
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                  ok:
//  *                    type: boolean
//  *                  data:
//  *                    type: object
//  *                    example:
//  *                      {
//  *                        "user": {},
//  *                        "accessToken": "string",
//  *                        "refreshToken": "string",
//  *                      }
//  */
