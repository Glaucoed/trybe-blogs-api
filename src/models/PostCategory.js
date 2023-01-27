const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {
    postId: {  type: DataTypes.INTEGER, foreignKey: true },
    categoryId: {  type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: "posts_categories",
    underscored: true
  });

  PostCategory.associate = ({Category, BlogPost}) => {
    BlogPost.belongsToMany(Category, {
      as: 'blogposts',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory
    });
    Category.belongsToMany(BlogPost, {
      as: 'categories',
      foreignKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory
    });
  }

  return PostCategory;
};

module.exports = PostCategory;