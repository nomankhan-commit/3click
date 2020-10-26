'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Profile = sequelize.define('User_Profile', {
    User_Profile_Id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    First_Name: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    User_Title: DataTypes.STRING,
    User_Address: DataTypes.STRING,
    Verify_Date: DataTypes.DATE,
    Verify_link: DataTypes.STRING,
    Is_Verify: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'User_Profile'
  });
  User_Profile.associate = function(models) {
    // associations can be defined here
  };
  return User_Profile;
};