'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_State = sequelize.define('Sys_State', {
    State_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    State_Name: DataTypes.STRING(200),
    State_Code : DataTypes.STRING(200),
    Country_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_State'
  });
  Sys_State.associate = function(models) {
    // associations can be defined here
  };
  return Sys_State;
};