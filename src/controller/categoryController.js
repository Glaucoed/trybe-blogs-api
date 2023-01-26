const categoryService = require('../services/categoryService');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const data = await categoryService.insertCategory({ name });
  return res.status(201).json(data);
};

const getAllCategories = async (_req, res) => {
  const data = await categoryService.getAllCategories();
  return res.status(200).json(data);
};

module.exports = {
  insertCategory,
  getAllCategories,
};