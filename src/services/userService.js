const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const { validateUserFields } = require('../utils/validateJoi');

const insertUser = async (newUser) => {
  const { error } = validateUserFields(newUser);
  if (error) return { validate: error.message };

  const existsEmail = await User.findOne({ where: { email: newUser.email } });  
  if (existsEmail) return { message: 'User already registered' };
  
  await User.create(newUser);

  const token = generateToken({ email: newUser.email });

  return { token };
};

const getAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUser = async (id) => User
  .findOne({ where: { id }, attributes: { exclude: ['password'] } }); 

module.exports = {
  getAllUsers,
  insertUser,
  getUser,
};