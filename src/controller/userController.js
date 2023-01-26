const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const { message, token, validate } = await userService.insertUser(req.body);

  if (validate) return res.status(400).json({ message: validate });
  if (message) return res.status(409).json({ message });

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  return res.status(200).json(data);
};

module.exports = {
  getAllUsers,
  insertUser,
};