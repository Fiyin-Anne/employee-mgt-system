module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Departments',
    [
      {
        name: 'HR',
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Engineering',
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};