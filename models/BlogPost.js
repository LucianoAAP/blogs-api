const BlogPost = (sequelize, DataTypes) => {
  const postData = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false, underscored: true });

  postData.associate = (models) => {
    postData.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return postData;
};

module.exports = BlogPost;