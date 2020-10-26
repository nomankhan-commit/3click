'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Notification = sequelize.define('User_Notification', {
    User_Notification_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id : DataTypes.INTEGER,
    User_Notification_Title : DataTypes.STRING,
    User_Notification_Description : DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  },{

    timestamps: false,
    tableName: 'User_Notification'
  });
  User_Notification.associate = function(models) {
    // associations can be defined here
  };
  return User_Notification;
};