'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_User_Log = sequelize.define('Sec_User_Log', {
    User_Log_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Id: DataTypes.INTEGER,
    Login_Time: DataTypes.DATE,
    User_Log_Token: DataTypes.STRING,
    User_Log_App: DataTypes.STRING,
    User_Log_Device: DataTypes.STRING,
    User_Log_Machine_Ip: DataTypes.STRING,
    Logout_Time: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_User_Log'

  });
  Sec_User_Log.associate = function(models) {
    // associations can be defined here
  };
  return Sec_User_Log;
};