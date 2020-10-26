'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Location = sequelize.define('User_Location', {
    User_Location_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Location_Id: DataTypes.INTEGER,
    Frequency: DataTypes.INTEGER,
    Is_Favorite: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {


    timestamps: false,
    tableName: 'User_Location'
  });
  User_Location.associate = function(models) {
    // associations can be defined here
  };
  return User_Location;
};