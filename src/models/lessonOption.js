"use strict";
module.exports = (sequelize, DataTypes) => {
  const LessonOption = sequelize.define(
    "LessonOption",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      content: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      correct: DataTypes.BOOLEAN
    },
    {}
  );
  LessonOption.associate = function(models) {
    LessonOption.belongsTo(models.CourseLesson, {
      as: "Lesson",
      foreignKey: "lessonId"
    });
  };
  return LessonOption;
};
