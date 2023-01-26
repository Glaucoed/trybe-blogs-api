const { generateToken } = require('../utils/jwt');
const loginServices = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginServices.verifyEmailAndPassword(email, password);
  if (!data) return res.status(400).json({ message: 'Invalid fields' });

  const token = generateToken({ email, password });

 return res.status(200).send({ token });
};

module.exports = {
  login,
};