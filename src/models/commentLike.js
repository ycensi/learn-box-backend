'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {}, {});
  CommentLike.associate = function (models) {
    // associations can be defined here
  };
  return CommentLike;
};