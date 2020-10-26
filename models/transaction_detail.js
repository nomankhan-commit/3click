'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction_Detail = sequelize.define('Transaction_Detail', {
    Transaction_Detail_Id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    Transaction_Master_Id: DataTypes.INTEGER,
    Transaction_Type: DataTypes.STRING,
    Amount: DataTypes.DECIMAL(),
    Created_By: DataTypes.INTEGER,
    Created_Date: DataTypes.DATE,
    Modified_By: DataTypes.INTEGER,
    Modified_Date: DataTypes.DATE,
    Is_Active: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'Transaction_Detail'
  });
  Transaction_Detail.associate = function(models) {
    // associations can be defined here
  };
  return Transaction_Detail;
};