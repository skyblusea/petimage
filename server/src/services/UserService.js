const User = require('../models/User');
const auth = require('../middlewares/auth');

const signInKakao = async (data) => {
  const name = data.properties?.nickname;
  const email = data.kakao_account?.email;
  const kakaoId = data.id;
  let result = { user: {}, accessToken: '', refreshToken: '' };

  let user = await User.findOne({ providerId: kakaoId });
  if (!user) {
    user = await User.create({ email, name, providerId: kakaoId });
  }
  result.refreshToken = await auth.createRefreshToken();
  await User.findByIdAndUpdate(user._id, { refresh: result.refreshToken });

  result.user = user;
  result.accessToken = await auth.createAccessToken(user._id);
  return result;
};

module.exports = { signInKakao };
