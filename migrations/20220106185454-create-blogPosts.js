'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (queryInterface.createTable('BlogPosts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING, allowNull: false },
    userId: {
      type: Sequelize.INTEGER,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    published: { type: Sequelize.DATE, allowNull: false },
    updated: { type: Sequelize.DATE, allowNull: false },
  })),

  down: async (queryInterface) => queryInterface.dropTable("BlogPosts"),
};
