'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Location = sequelize.define('Sys_Location', {
    Location_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Location_name: DataTypes.STRING(200),
    Latitude: DataTypes.INTEGER,
    Longitude: DataTypes.INTEGER,
    City_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Location'
  });
  Sys_Location.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Location;
};