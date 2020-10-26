'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_Role = sequelize.define('Sec_Role', {
    Role_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Role_Name: DataTypes.STRING(200),
    Role_Detail: DataTypes.STRING(200),
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_Role'
  });
  Sec_Role.associate = function(models) {
    // associations can be defined here
  };
  return Sec_Role;
};