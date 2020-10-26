'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_Activity = sequelize.define('Sec_Activity', {
    Activity_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Activity_Name: DataTypes.STRING(200),
    Activity_Code: DataTypes.INTEGER,
    Activity_Parent_Id: DataTypes.INTEGER,
    Activity_Detail: DataTypes.STRING(200),
    Activity_Type_Id: DataTypes.INTEGER,
    Activity_X_Postion: DataTypes.INTEGER,
    Activity_Y_Postion: DataTypes.INTEGER,
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_Activity'

  });
  Sec_Activity.associate = function(models) {
    // associations can be defined here
  };
  return Sec_Activity;
};