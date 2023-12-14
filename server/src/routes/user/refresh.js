const jwt = require('jsonwebtoken');
const { refreshVerify, createAccessToken, verify } = require('../../middlewares/auth');

const refresh = async (req, res) => {
  try {
    if (req.headers['authorization'] && req.headers['refresh']) {
      const accessToken = req.headers['authorization'].split(' ')[1];
      const refreshToken = req.headers['refresh'];

      const authResult = verify(accessToken);
      const decoded = jwt.decode(accessToken);

      if (!decoded) {
        res.status(401).json({ ok: false, data: 'No Authorized' });
      }

      if (authResult.ok === false && authResult.data === 'jwt expired') {
        // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
        const refreshResult = await refreshVerify(refreshToken, decoded.id);
        if (refreshResult === false) {
          res.status(401).json({ ok: false, data: 'need login' });
        } else {
          // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
          const newAccessToken = await createAccessToken(decoded.id);

          res.status(200).json({ ok: true, data: { accessToken: newAccessToken, refreshToken } });
        }
      } else {
        // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
        res.status(202).json({ ok: false, data: 'not expired' });
      }
    } else {
      // access token 또는 refresh token이 헤더에 없는 경우
      res.status(401).json({ ok: false, data: 'need header info' });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = refresh;

/**
 * @swagger
 *
 * /v1/user/refresh:
 *  get:
 *    summary: "jwt token refresh"
 *    description: "header authorization에 access token, refresh에 refresh token 있어야 함<br /><br />data<br /> - 401 'need login': access, refresh 모두 만료되어 재로그인 필요<br /> - 401 'need header info': 헤더에 값이 없음<br /> - 202 'not expired': access 만료되지 않음<br /> "
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *      - refreshAuth: []
 *    responses:
 *      "200":
 *        description: 토큰 리프레쉬 성공
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
 *      "401":
 *        description: 토큰 리프레쉬 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  ok:
 *                    type: boolean
 *                    example: false
 *                  data:
 *                    type: string
 *                    example: 'need login'
 */
