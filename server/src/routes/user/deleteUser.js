const UserService = require('../../services/UserService');

const deleteUser = async (req, res) => {
  try {
    const userId = req.tokenInfo.id;
    const result = await UserService.delUser(userId);
    return res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = deleteUser;

/**
 * @swagger
 *
 * /v1/user/delete:
 *  delete:
 *    summary: "회원 탈퇴"
 *    description: "Header Authorization에 Bearer token 정보 필요"
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      "200":
 *        description: ''
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
 *                          "acknowledged": true,
 *                          "deletedCount": 1
 *                      }
 */
