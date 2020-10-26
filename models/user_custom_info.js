'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Custom_Info = sequelize.define('User_Custom_Info', {
    User_Custom_Info_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Field_Id: DataTypes.INTEGER,
    Field_Value: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'User_Custom_Info'
  });
  User_Custom_Info.associate = function(models) {
    // associations can be defined here
  };
  return User_Custom_Info;
};