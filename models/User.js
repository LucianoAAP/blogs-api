const User = (sequelize, DataTypes) => {
  const userData = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false, underscored: true });

  userData.associate = (models) => {
    userData.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
  };

  return userData;
};

module.exports = User;