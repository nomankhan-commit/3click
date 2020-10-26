'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Activity_Type = sequelize.define('Sys_Activity_Type', {
    Activity_Type_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Activity_Type_Name: DataTypes.STRING(200),
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Activity_Type'
  });
  Sys_Activity_Type.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Activity_Type;
};