"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseStudent = sequelize.define(
    "CourseStudent",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Courses",
          key: "id"
        }
      },
      currentLesson: DataTypes.INTEGER
    },
    {}
  );
  CourseStudent.associate = function(models) {
    CourseStudent.belongsTo(models.User);
    CourseStudent.belongsTo(models.Course);
  };
  return CourseStudent;
};
