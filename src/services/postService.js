const categoryService = require('./categoryService');

const { Category, BlogPost, User, PostCategory } = require('../models');

const getAllPosts = async () => {
  const data = await BlogPost
    .findAll({ 
      attributes: { 
        exclude: ['user_id'], 
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  
  return data;
};

const insertPost = async (title, content, categoryIds, token) => {
  const userId = await User.findOne({ where: { email: token } });

  const resultPromisse = await Promise.all(categoryIds
    .map(async (category) => categoryService.findByIdCategory(category)));

    const verifyIsValid = await resultPromisse.every((result) => result);
    
    if (!verifyIsValid) return { message: 'one or more "categoryIds" not found' };

  const data = await BlogPost.create({ title, 
    content,
    userId: userId.id,
    updated: Date.now(),
    published: Date.now() });

  await Promise.all(
    categoryIds.map(async (categoryId) => PostCategory.create({ postId: data.id, categoryId })),
  
  );

  return data;
};

module.exports = {
  getAllPosts,
  insertPost,
};