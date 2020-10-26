'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Address = sequelize.define('User_Address', {
    User_Adress_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id :DataTypes.INTEGER,
    User_Address_Line1: DataTypes.STRING,
    User_Address_Line2: DataTypes.STRING,
    User_Address_Type: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {    
    timestamps: false,
    tableName: 'User_Address'});
  User_Address.associate = function(models) {
    // associations can be defined here
  };
  return User_Address;
};