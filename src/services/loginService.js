const { User } = require('../models');

const verifyEmailAndPassword = async (email, password) => 
User.findOne({ where: { email, password } });

module.exports = {
  verifyEmailAndPassword,
};