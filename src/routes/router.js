const express = require('express');

const routers = express.Router();

const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');

routers.use('/login', loginRoutes);
routers.use('/user', userRoutes);

module.exports = routers;