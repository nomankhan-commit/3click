'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Promo = sequelize.define('User_Promo', {
    User_Promo_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Promo_Id: DataTypes.INTEGER,
    User_Id: DataTypes.INTEGER,
    Promo_Start_Date: DataTypes.DATE,
    Promo_Expiry_Date: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {

    timestamps: false,
    tableName: 'User_Promo'
  });
  User_Promo.associate = function(models) {
    // associations can be defined here
  };
  return User_Promo;
};