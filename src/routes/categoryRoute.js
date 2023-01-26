const router = require('express').Router();
const userController = require('../controller/categoryController');
const auth = require('../middlewares/auth.middleware');
const validateName = require('../middlewares/validateName.middleware');

router.post('/', auth, validateName, userController.insertCategory);

module.exports = router;