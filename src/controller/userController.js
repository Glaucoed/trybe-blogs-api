const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const { message, token, validate } = await userService.insertUser(req.body);

  if (validate) return res.status(400).json({ message: validate });
  if (message) return res.status(409).json({ message });

  res.status(201).json({ token });
};

module.exports = {
  insertUser,
};