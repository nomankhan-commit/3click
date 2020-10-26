'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction_Master = sequelize.define('Transaction_Master', {
    Transaction_Master_Id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Bneficiary_Id: DataTypes.INTEGER,
    Payment_Mode_Id: DataTypes.INTEGER,
    Invoice_Number: DataTypes.INTEGER,
    Invoice_Date: DataTypes.DATE,
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Transaction_Master'
  });
  Transaction_Master.associate = function(models) {
    // associations can be defined here
  };
  return Transaction_Master;
};