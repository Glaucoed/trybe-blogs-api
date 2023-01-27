const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: "blog_posts",
    underscored: true
  });

  BlogPost.associate = ({User}) => {
    BlogPost.belongsTo(User, {
      foreignKey: 'user_id',
      as: 'users'
    })
  }

  return BlogPost;
};

module.exports = BlogPost;