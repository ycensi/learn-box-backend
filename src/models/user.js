'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    googleId: DataTypes.STRING,
    githubId: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Project, {
      through: 'ProjectLikes',
      as: 'LikedProjects'
    });
    User.belongsToMany(models.Project, {
      through: 'ProjectFollowers',
      as: 'FollowingProjects'
    });
    User.belongsToMany(models.User, {
      through: 'UserFollowers',
      as: 'FollowingUsers'
    });
    User.belongsToMany(models.CommentLike, {
      through: 'CommentLikes',
      as: 'LikedComments'
    });
    User.belongsToMany(models.PostLike, {
      through: 'PostLikes',
      as: 'LikedPosts'
    });
  };
  return User;
};