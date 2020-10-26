'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Discount = sequelize.define('Sys_Discount', {
    Discount_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Discount_Name: DataTypes.STRING,
    Discount_Type: DataTypes.STRING,
    Discount_Value: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Discount'
  });
  Sys_Discount.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Discount;
};