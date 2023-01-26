const { generateToken } = require('../utils/jwt');
const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService.verifyEmailAndPassword(email, password);
  if (!data) return res.status(400).json({ message: 'Invalid fields' });

  const token = generateToken({ email });

 return res.status(200).json({ token });
};

module.exports = {
  login,
};