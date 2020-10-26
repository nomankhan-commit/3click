'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_Role_Activity = sequelize.define('Sec_Role_Activity', {
    Role_Activity_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Role_Id: DataTypes.INTEGER,
    Activity_Id: DataTypes.INTEGER,
    Option_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {

    timestamps: false,
    tableName: 'Sec_Role_Activity'
  });
  Sec_Role_Activity.associate = function(models) {
    // associations can be defined here
  };
  return Sec_Role_Activity;
};