'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Custom_Feild = sequelize.define('Sys_Custom_Field', {
    Field_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Field_Name: DataTypes.STRING(200),
    Field_Detail: DataTypes.STRING(200),
    Field_Datatype: DataTypes.STRING(200),
    Field_Formate: DataTypes.STRING(200),
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Custom_Feild'
  });
  Sys_Custom_Feild.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Custom_Feild;
};