'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ride_Map = sequelize.define('Rms_Ride_Map', {
    Ride_Map_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Ride_Multi_Location_Id: DataTypes.INTEGER,
    Map: DataTypes.BLOB,
    To_Longitude: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Rms_Ride_Map'
  });
  Ride_Map.associate = function(models) {
    // associations can be defined here
  };
  return Ride_Map;
};