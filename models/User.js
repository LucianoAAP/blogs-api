const User = (sequelize, DataTypes) => {
  const userData = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false });

  return userData;
};

module.exports = User;