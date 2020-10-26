'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_User_Role = sequelize.define('Sec_User_Role', {
    User_Role_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Role_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_User_Role',
    freezeTableName: true
    
  });
  Sec_User_Role.associate = function(models) {
    // associations can be defined here
  };
  return Sec_User_Role;
};