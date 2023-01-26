const express = require('express');

const routers = express.Router();

const loginRoutes = require('./loginRoutes');

routers.use('/login', loginRoutes);

module.exports = routers;