const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '10h',
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
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    return { email };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  generateToken,
  decodeToken,
};