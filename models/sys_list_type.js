'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_List_Type = sequelize.define('Sys_List_Type', {
    List_Type_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    List_Type: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_List_Type'
  });
  Sys_List_Type.associate = function(models) {
    // associations can be defined here
  };
  return Sys_List_Type;
};