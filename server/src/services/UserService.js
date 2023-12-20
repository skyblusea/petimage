const User = require('../models/User');
const auth = require('../middlewares/auth');

const signInGoogle = async (data) => {
  const name = data.name;
  const email = data.email;
  const providerId = data.sub;

  let result = { user: {}, accessToken: '', refreshToken: '' };

  let user = await User.findOne({ provider: 'google', providerId });
  if (!user) {
    user = await User.create({ email, name, providerId, provider: 'google' });
  }
  result.refreshToken = await auth.createRefreshToken();
  await User.findByIdAndUpdate(user._id, { refresh: result.refreshToken });

  result.user = user;
  result.accessToken = await auth.createAccessToken(user._id);
  return result;
};

const signInApple = async (data) => {
  const name = data.name;
  const email = data.email ? data.email : '';
  const providerId = data.info.sub;

  let result = { user: {}, accessToken: '', refreshToken: '' };

  let user = await User.findOne({ provider: 'apple', providerId });
  if (!user) {
    user = await User.create({ email, name, providerId, provider: 'apple' });
  }
  result.refreshToken = await auth.createRefreshToken();
  await User.findByIdAndUpdate(user._id, { refresh: result.refreshToken });

  result.user = user;
  result.accessToken = await auth.createAccessToken(user._id);
  return result;
};

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

const delUser = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};

module.exports = { signInGoogle, signInApple, signInKakao, delUser };
