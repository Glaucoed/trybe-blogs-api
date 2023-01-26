const { decodeToken } = require('../utils/jwt');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
  const { message } = decodeToken(authorization);

  if (message) return res.status(401).json({ message: 'Expired or invalid token' });

  next();
};

module.exports = auth;