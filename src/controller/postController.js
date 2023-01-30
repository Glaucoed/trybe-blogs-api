const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
  const data = await postService.getAllPosts();
  return res.status(200).json(data);
};

const insertPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const result = await postService.insertPost(title, content, categoryIds, req.email);

  if (result.message) return res.status(400).json({ message: result.message }); 

  return res.status(201).json(result);
};

const findByIdPost = async (req, res) => {
  const { id } = req.params;
  const data = await postService.findByIdPost(id);
  if (!data) return res.status(404).json({ message: 'Post does not exist' }); 
  return res.status(200).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const data = await postService.updatePost(id, req.email, { title, content });
  if (data.message) return res.status(401).json({ message: data.message }); 
  return res.status(200).json(data);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { message, permission } = await postService.deletePost(id, req.email);

  if (message) return res.status(404).json({ message });
  if (permission) return res.status(401).json({ message: permission });
  return res.status(204).end();
};

const getSearch = async (req, res) => {
  const { q: search } = req.query;
  
  const data = await postService.getSearch(search);

  res.status(200).json(data);
};

module.exports = {
  getAllPosts,
  insertPost,
  findByIdPost,
  updatePost,
  deletePost,
  getSearch,
};