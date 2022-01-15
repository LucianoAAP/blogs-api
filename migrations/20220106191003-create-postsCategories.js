'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (queryInterface.createTable('PostsCategories', {
    postId: {
      type: Sequelize.INTEGER,
      field: 'post_id',
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      field: 'category_id',
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  })),

  down: async (queryInterface) => queryInterface.dropTable("PostsCategories"),
};
