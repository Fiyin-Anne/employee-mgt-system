module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        "name": "Fiyin",
        "surname": "Anne",
        "email": "fiyinakinsiku.b@gmail.com",
        "password": "fiyin",
        "department": 1,
        "title": "Head of HR",
        "type": "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      "name": "Fiyin",
      "surname": "Bolu",
      "email": "fiyinakinsiku2@gmail.com",
      "password": "fiyin",
      "department": 1,
      "title": "Head of ENGINEERING",
      "type": "USER",
      createdAt: new Date(),
      updatedAt: new Date()
  },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};