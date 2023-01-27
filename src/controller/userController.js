const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const { message, token, validate } = await userService.insertUser(req.body);

  if (validate) return res.status(400).json({ message: validate });
  if (message) return res.status(409).json({ message });

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const data = await userService.getAllUsers();
  return res.status(200).json(data);
};

const deleteMeUser = async (req, res) => {
  const { authorization } = req.headers;

  await userService.deleteMeUser(authorization);
  res.status(204).end();
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const data = await userService.getUser(id);

  if (!data) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(data);
};

module.exports = {
  insertUser,
  getAllUsers,
  deleteMeUser,
  getUser,
};