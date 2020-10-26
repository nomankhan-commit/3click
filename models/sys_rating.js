'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Rating = sequelize.define('Sys_Rating', {
    Rating_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Rating_Detail: DataTypes.STRING(200),
    Rating_Point: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Rating'
  });
  Sys_Rating.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Rating;
};