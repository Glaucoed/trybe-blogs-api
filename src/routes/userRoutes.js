const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/', userController.insertUser);

module.exports = router;