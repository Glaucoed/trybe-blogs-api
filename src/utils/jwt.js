const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1m',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, jwtConfig);
  } catch (error) {
    console.log(error.message);
    throw new Error('Falha ao gerar token');
  }
};

const decodeToken = (token) => {
  if (!token) {
    throw new Error('Undefined Token');
  }

  try {
    const result = jwt.verify(token, JWT_SECRET);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error('Invalid assignature');
  }
};

module.exports = {
  generateToken,
  decodeToken,
};