"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CourseStudents", {
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true
      },
      CourseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Courses",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true
      },
      currentLesson: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CourseStudents");
  }
};
