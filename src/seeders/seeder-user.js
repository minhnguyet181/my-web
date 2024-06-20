'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'nanbowan@gmail.com',
      password: '181216',
      firstName: 'Moon',
      lastName: 'Light',
      address: 'Vietnam',
      phoneNumber: '0343651621',
      gender: 0,
      roleId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
