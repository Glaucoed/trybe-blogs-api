const express = require('express');

const routers = express.Router();

const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoriesRoutes = require('./categoryRoute');

routers.use('/login', loginRoutes);
routers.use('/user', userRoutes);
routers.use('/categories', categoriesRoutes);

module.exports = routers;