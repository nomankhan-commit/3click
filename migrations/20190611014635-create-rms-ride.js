'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rms_Ride', {
      Ride_Id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   
      Arrived_Time: {
        type: Sequelize.DATE
      },
      Start_Time: {
        type: Sequelize.DATE
      },
      End_Time: {
        type: Sequelize.DATE
      },
      Distance: {
        type: Sequelize.INTEGER
      },
      Duration: {
        type: Sequelize.INTEGER
      },
      Fare_Rate: {
        type: Sequelize.DECIMAL(10,2)
      },
      Waiting_Charge: {
        type: Sequelize.DECIMAL(10,2)
      },
      Surge_Charge: {
        type: Sequelize.DECIMAL(10,2)
      },
      Cancellation_Charge: {
        type: Sequelize.DECIMAL(10,2)
      },
      Multi_Location_Charge: {
        type: Sequelize.DECIMAL(10,2)
      },
      Total_Fare: {
        type: Sequelize.DECIMAL(10,2)
      },
      Promo_Amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      Paid_Amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      Accept_Id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        default:0
      },
      Ride_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        default:0
      },
      Remarks: {
        type: Sequelize.STRING
      },
      Created_By: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Created_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        default:Date.now
      },
      Modified_By: {
        type: Sequelize.INTEGER,
      },
      Modified_Date: {
        type: Sequelize.DATE
      },
      Is_Active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:1
      }
   
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rms_Ride');
  }
};