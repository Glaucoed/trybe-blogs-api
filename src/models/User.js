const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "users",
    underscored: true
  });

  return User;
};

module.exports = User;