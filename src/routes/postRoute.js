const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const postController = require('../controller/postController');
const validateFieldsPost = require('../middlewares/validateFieldsPost.middleware');

router.get('/search', auth, postController.getSearch);
router.get('/', auth, postController.getAllPosts);
router.post('/', validateFieldsPost, auth, postController.insertPost);
router.get('/:id', auth, postController.findByIdPost);
router.put('/:id', auth, validateFieldsPost, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;