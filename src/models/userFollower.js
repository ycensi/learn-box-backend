'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollower = sequelize.define('UserFollower', {
    level: DataTypes.INTEGER
  }, {});
  UserFollower.associate = function (models) {
    // associations can be defined here
  };
  return UserFollower;
};