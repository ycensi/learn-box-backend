"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  Course.associate = function(models) {
    Course.belongsToMany(models.User, {
      through: "CourseStudents",
      as: "Students",
      foreignKey: "CourseId"
    });
  };
  return Course;
};
