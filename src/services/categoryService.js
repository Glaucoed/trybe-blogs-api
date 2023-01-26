const { Category } = require('../models');

const insertCategory = async (newCategory) => {
  const data = await Category.create(newCategory);
  return data;
};

const getAllCategories = async () => {
  const data = await Category.findAll();
  return data;
};

module.exports = {
  insertCategory,
  getAllCategories,
};