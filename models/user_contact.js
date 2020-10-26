'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Contact = sequelize.define('User_Contact', {
    User_Contact_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Contact_Type: DataTypes.STRING, //email  phone mobile skype
    User_Id : DataTypes.INTEGER,
    Is_Primary: DataTypes.INTEGER,
    User_Contact_Value1: DataTypes.STRING,
    User_Contact_Value2: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {

    timestamps: false,
    tableName: 'User_Contact',
  });
  User_Contact.associate = function(models) {
    // associations can be defined here
  };
  return User_Contact;
};