'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Config_Detail = sequelize.define('Sys_Config_Detail', {
    Config_Detail_id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Config_Id: DataTypes.INTEGER,
    Config_Detail_Data: DataTypes.STRING.BINARY,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Config_Detail'

  });
  Sys_Config_Detail.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Config_Detail;
};