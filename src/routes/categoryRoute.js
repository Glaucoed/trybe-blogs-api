const router = require('express').Router();
const categoryController = require('../controller/categoryController');
const auth = require('../middlewares/auth.middleware');
const validateName = require('../middlewares/validateName.middleware');

router.post('/', auth, validateName, categoryController.insertCategory);
router.get('/', auth, categoryController.getAllCategories);

module.exports = router;