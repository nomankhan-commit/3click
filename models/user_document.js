'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Document = sequelize.define('User_Document', {
    User_Document_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Document_Type: {
      type: DataTypes.ENUM,
      values: ['profile_image']
    },
    Document_Detail: DataTypes.STRING,
    User_Document: DataTypes.STRING.BINARY,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'User_Document'
  });
  User_Document.associate = function(models) {
    // associations can be defined here
  };
  return User_Document;
};