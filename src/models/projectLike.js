'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectLike = sequelize.define('ProjectLike', {}, {});
  ProjectLike.associate = function (models) {
    // associations can be defined here
  };
  return ProjectLike;
};