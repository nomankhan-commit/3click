'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rms_Request = sequelize.define('Rms_Request', {
    Request_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    From_Latitude: DataTypes.STRING,
    From_Longitude: DataTypes.STRING,
    From_Location: DataTypes.STRING,
    To_Latitude: DataTypes.STRING,
    To_Longitude: DataTypes.STRING,
    To_Location: DataTypes.STRING,
    Item_Weight: DataTypes.DECIMAL,
    ETA_Amount: DataTypes.DECIMAL,
    Shipping_Type_Id: DataTypes.INTEGER,
    Promo_Id: DataTypes.INTEGER,
    Requested_By: DataTypes.INTEGER,
    Requested_Date: DataTypes.DATE,
    Requested_Expiry: DataTypes.DATE,
    Request_Status_Id: DataTypes.INTEGER,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Rms_Request'
  });
  Rms_Request.associate = function(models) {
    // associations can be defined here
    Rms_Request.hasOne(models.Rms_Accept , {
      foreignKey: {
        name: 'Request_Id',
        targetKey: 'Request_Id'
      },
      as: 'Rms_Accept'
    });

    Rms_Request.hasOne(models.Sys_List , {
      
      foreignKey: 'List_Value', 
      sourceKey: 'Item_Weight',
      as: 'Weight_List'
    });

    Rms_Request.hasOne(models.User , {
      
      foreignKey: 'User_Id', 
      sourceKey: 'Requested_By',
      as: 'User'
    });

    
  };


  return Rms_Request;
};