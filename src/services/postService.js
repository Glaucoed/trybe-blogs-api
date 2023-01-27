const { Category, BlogPost, User } = require('../models');

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

module.exports = {
  getAllPosts,
};

// { attributes: { exclude: ['password'] } }