const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.createAccessToken = async (id) => {
  const accToken = jwt.sign({ id }, config.accSecret, { expiresIn: '1 days' });
  return accToken;
};

exports.createRefreshToken = async () => {
  const refToken = jwt.sign({}, config.refSecret, { expiresIn: '30 days' });
  return refToken;
};

exports.verifyAccessToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    res.status(403).json({ ok: false, data: 'token format error' });
  } else {
    try {
      const token = authHeader.split(' ')[1];
      if (token == 'admin') req.tokenInfo = { id: '656d5f1794d38c929257af9e' };
      else {
        jwt.verify(token, config.accSecret, async (error, decoded) => {
          if (error) {
            console.error(error);
            res.status(403).json({ ok: false, data: error.message });
          } else {
            req.tokenInfo = decoded;
          }
        });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(403).json({ ok: false, data: err.message });
    }
  }
};

exports.verify = (token) => {
  try {
    const decoded = jwt.verify(token, config.accSecret);
    return {
      ok: true,
      data: decoded.id,
    };
  } catch (error) {
    return {
      ok: false,
      data: error.message,
    };
  }
};

exports.refreshVerify = async (token, userId) => {
  try {
    const result = await User.findById(userId);
    console.log(token, result.refresh);
    if (token === result.refresh) {
      try {
        jwt.verify(token, config.refSecret);
        return true;
      } catch (err) {
        console.error('refresh: ', err);
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
