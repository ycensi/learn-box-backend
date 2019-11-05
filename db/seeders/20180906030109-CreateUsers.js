'use strict';

var faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const users = Array.from({
      length: 10
    }).map((i) => {
      var name = faker.name.findName();
      return {
        name: name,
        username: faker.internet.userName(name),
        password: 'asd123asd',
        email: faker.internet.email(name),
        location: 'Brasil'
      };
    });

    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};