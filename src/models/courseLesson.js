"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseLesson = sequelize.define(
    "CourseLesson",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      hasChallenge: DataTypes.BOOLEAN,
      challengeContent: DataTypes.STRING
    },
    {}
  );
  CourseLesson.associate = function(models) {
    CourseLesson.belongsTo(models.Course, {
      as: "Course",
      foreignKey: "courseId"
    });
  };
  return CourseLesson;
};
