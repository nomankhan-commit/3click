'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rms_Ride_Multi_Location', {
      Ride_Multi_Location_Id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      Ride_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      From_Latitude: {
        type: Sequelize.INTEGER
      },
      From_Longitude: {
        type: Sequelize.INTEGER
      },
      To_Latitude: {
        type: Sequelize.INTEGER
      },
      To_Longitude: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Rms_Ride_Multi_Location');
  }
};