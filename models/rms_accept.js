'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rms_Accept = sequelize.define('Rms_Accept', {
    Accept_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Request_Id: DataTypes.INTEGER,
    Current_Latitude: DataTypes.INTEGER,
    Current_Longitude: DataTypes.INTEGER,
    Accepted_By: DataTypes.INTEGER,
    Reference_Accept_Id: DataTypes.INTEGER,
    Accept_Status_Id: DataTypes.INTEGER,
    Accept_Status_Date: DataTypes.DATE,
    Accept_lag_Time: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Rms_Accept'
  });
  Rms_Accept.associate = function(models) {
    // associations can be defined here

    Rms_Accept.hasOne(models.Rms_Request , {
      foreignKey: {
        name: 'Request_Id',
        targetKey: 'Request_Id'
      },
      as: 'Rms_Request'
    });

    

    Rms_Accept.hasOne(models.Sys_List , {
      
      foreignKey: 'List_Id', 
      sourceKey: 'Accept_Status_Id',
      as: 'Accept_Status'
    });

    Rms_Accept.hasOne(models.Rms_Ride , {
      foreignKey: {
        name: 'Accept_Id',
        targetKey: 'Accept_Id'
      },
      as: 'Rms_Ride'
    });

    Rms_Accept.hasOne(models.User , {
      
      foreignKey: 'User_Id', 
      sourceKey: 'Accepted_By',
      as: 'User'
    });

    Rms_Accept.hasOne(models.Sec_User_Role , {
      
      foreignKey: 'User_Id', 
      sourceKey: 'Accepted_By',
      as: 'Sec_User_Role'
    });
    
    


  };
  return Rms_Accept;
};