'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    location: DataTypes.STRING
  }, {});
  Project.associate = function (models) {
    Project.belongsTo(models.User);
    Project.belongsToMany(models.User, {
      through: 'ProjectLike',
      as: 'Likes'
    });
    Project.belongsToMany(models.User, {
      through: 'ProjectFollower',
      as: 'Followers'
    });
  };
  return Project;
};