const Category = (sequelize, DataTypes) => {
  const CategoryData = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  { timestamps: false });

  return CategoryData;
};

module.exports = Category;