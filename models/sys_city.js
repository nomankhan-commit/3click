'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_City = sequelize.define('Sys_City', {
    City_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    City_Name: DataTypes.STRING(200),
    City_Code: DataTypes.INTEGER,
    State_Id: DataTypes.INTEGER,
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_City'
  });
  Sys_City.associate = function(models) {
    // associations can be defined here
  };
  return Sys_City;
};