'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Comment = sequelize.define('User_Comment', {
    User_Comment_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Comment_Id: DataTypes.INTEGER,
    Other_comment: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {

    timestamps: false,
    tableName: 'User_Comment'
  });
  User_Comment.associate = function(models) {
    // associations can be defined here
  };
  return User_Comment;
};