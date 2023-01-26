const router = require('express').Router();

const loginController = require('../controller/loginController');
const validateFieldsLogin = require('../middlewares/validateFieldsLogin.middleware');

router.post('/', validateFieldsLogin, loginController.login);

module.exports = router;