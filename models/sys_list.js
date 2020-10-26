'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sys_List = sequelize.define('Sys_List', {
    List_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    List_Name: DataTypes.STRING,
    List_Value: DataTypes.STRING,
    List_Custom_Value1: DataTypes.STRING,
    List_Custom_Value2: DataTypes.STRING,
    List_Custom_Value3: DataTypes.STRING,
    List_Type_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Sys_List'
  });
  Sys_List.associate = function(models) {

    // associations can be defined here
    Sys_List.hasOne(models.Sys_List , {
      foreignKey: {
        name: 'List_Name',
        targetKey: 'List_Id'
      },
      as: 'Weight_Rate'
    });

    
  };
  return Sys_List;
};