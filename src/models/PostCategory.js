const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {
    postId: {  type: DataTypes.INTEGER, foreignKey: true },
    categoryId: {  type: DataTypes.INTEGER, foreignKey: true},
  },
  {
    timestamps: false,
    tableName: "posts_categories",
    underscored: true
  });

  PostCategory.associate = ({Category, BlogPost}) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory
    });
    Category.belongsToMany(BlogPost, {
      as: 'blogposts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory
    });
  }

  return PostCategory;
};

module.exports = PostCategory;