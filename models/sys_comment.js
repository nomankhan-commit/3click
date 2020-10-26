'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Comment = sequelize.define('Sys_Comment', {
    User_Comment_Id : {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Comment_Id: DataTypes.INTEGER,
    Other_Comment: DataTypes.STRING(200),
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Comment'


  });
  Sys_Comment.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Comment;
};