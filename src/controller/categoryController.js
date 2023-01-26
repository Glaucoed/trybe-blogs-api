const categoryService = require('../services/categoryService');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const data = await categoryService.insertCategory({ name });
  return res.status(201).json(data);
};

module.exports = {
  insertCategory,
};