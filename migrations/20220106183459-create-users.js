'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    displayName: { type: Sequelize.STRING, allowNull: false, field: 'display_name' },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    image: { type: Sequelize.STRING },
  })),

  down: async (queryInterface) => queryInterface.dropTable("Users"),
};
