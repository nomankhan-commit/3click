'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_User_Log_Detail = sequelize.define('Sec_User_Log_Detail', {
    User_Log_Detail_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    User_Log_Id: DataTypes.INTEGER,
    Table_Name: DataTypes.STRING(1000),
    Crud_Operation: DataTypes.STRING(1000),
    SQL_Query: DataTypes.STRING(10000),
    Activity_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_User_Log_Detail'

  });
  Sec_User_Log_Detail.associate = function(models) {
    // associations can be defined here
  };
  return Sec_User_Log_Detail;
};