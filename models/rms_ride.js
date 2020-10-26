'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rms_Ride = sequelize.define('Rms_Ride', {
    Ride_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Arrived_Time: DataTypes.DATE,
    Start_Time: DataTypes.DATE,
    End_Time: DataTypes.DATE,
    Distance: DataTypes.INTEGER,
    Duration: DataTypes.INTEGER,
    Fare_Rate: DataTypes.DECIMAL,
    Waiting_Charge: DataTypes.DECIMAL,
    Surge_Charge: DataTypes.DECIMAL,
    Cancellation_Charge: DataTypes.DECIMAL,
    Multi_Location_Charge: DataTypes.DECIMAL,
    Total_Fare: DataTypes.DECIMAL,
    Promo_Amount: DataTypes.DECIMAL,
    Paid_Amount: DataTypes.DECIMAL,
    Accept_Id: DataTypes.INTEGER,
    Ride_Status_Id: DataTypes.INTEGER,
    Remarks: DataTypes.STRING,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Rms_Ride'

  });
  Rms_Ride.associate = function(models) {
    // associations can be defined here

    Rms_Ride.hasOne(models.Rms_Accept , {
      foreignKey: {
        name: 'Accept_Id',
        targetKey: 'Accept_Id'
      },
      as: 'Rms_Accept'
    });

    



  };
  return Rms_Ride;
};