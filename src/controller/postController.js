const postService = require('../services/postService');
const { decodeToken } = require('../utils/jwt');

const getAllPosts = async (_req, res) => {
  const data = await postService.getAllPosts();
  return res.status(200).json(data);
};

const insertPost = async (req, res) => {
  const { authorization } = req.headers;
  const { data } = decodeToken(authorization);
  req.body.token = data.email;

  const { title, content, categoryIds, token } = req.body;

  const result = await postService.insertPost(title, content, categoryIds, token);

  if (result.message) return res.status(400).json({ message: result.message }); 

  return res.status(201).json(result);
};

module.exports = {
  getAllPosts,
  insertPost,
};