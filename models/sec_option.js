'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sec_Option = sequelize.define('Sec_Option', {
    Option_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Option_Name: DataTypes.STRING(200),
    Option_Code: DataTypes.INTEGER,
    Option_Detail: DataTypes.STRING(200),
    Created_By: DataTypes.STRING(200),
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.STRING(200),
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sec_Option'
  });
  Sec_Option.associate = function(models) {
    // associations can be defined here
  };
  return Sec_Option;
};