'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ride_Multi_Location = sequelize.define('Rms_Ride_Multi_Location', {
    Ride_Multi_Location_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Ride_Id: DataTypes.INTEGER,
    From_Latitude: DataTypes.INTEGER,
    From_Longitude: DataTypes.INTEGER,
    To_Latitude: DataTypes.INTEGER,
    To_Longitude: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Rms_Ride_Multi_Location'
  });
  Ride_Multi_Location.associate = function(models) {
    // associations can be defined here
  };
  return Ride_Multi_Location;
};