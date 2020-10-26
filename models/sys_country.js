'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Country = sequelize.define('Sys_Country', {
    Country_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Country_Name: DataTypes.STRING(200),
    Country_Code: DataTypes.INTEGER,
    Country_Short_Code: DataTypes.INTEGER,
    Country_Dial_Code: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Country'
  });
  Sys_Country.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Country;
};