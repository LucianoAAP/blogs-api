const Category = (sequelize, DataTypes) => {
  const categoryData = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  { timestamps: false });

  return categoryData;
};

module.exports = Category;