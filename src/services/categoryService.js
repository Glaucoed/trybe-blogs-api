const { Category } = require('../models');

const insertCategory = async (newCategory) => {
  const data = await Category.create(newCategory);
  return data;
};

module.exports = {
  insertCategory,
};