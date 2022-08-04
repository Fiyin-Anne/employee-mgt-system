module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Departments',
    [
      {
        "name": "Engineering",
        "manager": 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Customer Support",
        "manager": 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Human Resource",
        "manager": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "name": "Accounting",
        "manager": 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};