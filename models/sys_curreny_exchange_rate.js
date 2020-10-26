'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_Curreny_Exchange_Rate = sequelize.define('Sys_Curreny_Exchange_Rate', {
    Exchange_Rate_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Curreny_Id: DataTypes.INTEGER,
    Exchange_Rate: DataTypes.INTEGER,
    Effective_date: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_Curreny_Exchange_Rate'
  });
  Sys_Curreny_Exchange_Rate.associate = function(models) {
    // associations can be defined here
  };
  return Sys_Curreny_Exchange_Rate;
};