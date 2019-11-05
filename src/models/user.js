"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "student"),
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Course, {
      through: "CourseStudents",
      as: "Courses",
      foreignKey: "UserId"
    });
  };
  return User;
};
