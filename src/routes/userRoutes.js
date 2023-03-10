const router = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middlewares/auth.middleware');

router.post('/', userController.insertUser);
router.get('/', auth, userController.getAllUsers);
router.delete('/me', auth, userController.deleteMeUser);
router.get('/:id', auth, userController.getUser);

module.exports = router;