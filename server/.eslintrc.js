module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier', 'javascriptreact'],
  rules: {
    'linebreak-style': 0, // 윈도우 필수
    'no-console': 0, // 콘솔로그 사용
    'no-else-return': 0,
    'no-unused-vars': 'off',
  },
};
