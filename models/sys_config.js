'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Config = sequelize.define('Sys_Config', {
    Config_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Config_Name: DataTypes.STRING,
    Config_Key: DataTypes.STRING,
    Config_Value: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Config'

  });
  Sys_Config.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Config;
};