'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (queryInterface.createTable('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: { type: Sequelize.STRING, allowNull: false },
  })),

  down: async (queryInterface) => queryInterface.dropTable("Categories"),
};
