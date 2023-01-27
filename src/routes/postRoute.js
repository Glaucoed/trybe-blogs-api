const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const postController = require('../controller/postController');
const validateFieldsPost = require('../middlewares/validateFieldsPost.middleware');

router.get('/', auth, postController.getAllPosts);
router.post('/', validateFieldsPost, auth, postController.insertPost);

module.exports = router;