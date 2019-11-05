'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectFollower = sequelize.define('ProjectFollower', {}, {});
  ProjectFollower.associate = function (models) {
    // associations can be defined here
  };
  return ProjectFollower;
};