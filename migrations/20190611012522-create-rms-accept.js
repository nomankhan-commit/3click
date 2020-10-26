'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rms_Accept', {
      Accept_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      Request_Id: {
        type: Sequelize.INTEGER
      },
      Current_Latitude: {
        type: Sequelize.INTEGER
      },
      Current_Longitude: {
        type: Sequelize.INTEGER
      },
      Accepted_By: {
        type: Sequelize.INTEGER
      },
      Reference_Accept_Id: {
        type: Sequelize.INTEGER
      },
      Accept_Status_Id: {
        type: Sequelize.INTEGER
      },
      Accept_Status_Date: {
        type: Sequelize.DATE
      },
      Accept_lag_Time: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Rms_Accept');
  }
};