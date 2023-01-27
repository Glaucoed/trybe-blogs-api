const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const postController = require('../controller/postController');

router.get('/', auth, postController.getAllPosts);

module.exports = router;