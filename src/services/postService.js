const { Op } = require('sequelize');
const categoryService = require('./categoryService');
const { decodeToken } = require('../utils/jwt');

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

const findByIdPost = async (id) => {
  const [data] = await BlogPost
  .findAll({
    where: { id },
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

const updatePost = async (id, authorization, newUpdate) => {
  const getUser = await BlogPost.findByPk(id);

  const { data: { email } } = decodeToken(authorization);

  const userHasPermission = await User.findOne({ where: { email } });

  if (userHasPermission.id !== getUser.userId) return { message: 'Unauthorized user' }; 

  await BlogPost.update(newUpdate, { where: { id } });

  const data = await findByIdPost(id);

  return data;
};

const deletePost = async (id, authorization) => {
  const getUser = await BlogPost.findByPk(id);
  if (!getUser) return { message: 'Post does not exist' }; 
  
  const { data: { email } } = decodeToken(authorization);
  
  const userHasPermission = await User.findOne({ where: { email } });
  
  if (userHasPermission.id !== getUser.userId) return { permission: 'Unauthorized user' }; 
  
  await BlogPost.destroy({ where: { id } });
  return { message: false, permission: false };
};

const getSearch = async (search) => {
  const data = await BlogPost.findAll(
    { where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
      
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
},
);
  return data;
};

module.exports = {
  getAllPosts,
  insertPost,
  findByIdPost,
  updatePost,
  deletePost,
  getSearch,
};