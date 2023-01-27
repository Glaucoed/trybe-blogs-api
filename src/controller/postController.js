const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
    const data = await postService.getAllPosts();
  return res.status(200).json(data);
};

module.exports = {
  getAllPosts,
};