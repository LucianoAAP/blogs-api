require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
};