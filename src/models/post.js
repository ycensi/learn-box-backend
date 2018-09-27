'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    locked: DataTypes.BOOLEAN,
    edited: DataTypes.BOOLEAN
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.Project);
    Post.belongsTo(models.User);
  };
  return Post;
};