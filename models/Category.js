const Category = (sequelize, DataTypes) => {
  const categoryData = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  { timestamps: false, tableName: 'Categories' });

  return categoryData;
};

module.exports = Category;