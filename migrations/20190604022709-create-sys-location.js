'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_Location', {
      
      Location_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Location_name: {
        type: Sequelize.STRING(200)

      },
      Latitude: {
        type: Sequelize.INTEGER
      },
      Longitude: {
        type: Sequelize.INTEGER
      },
      City_Id: {
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
    return queryInterface.dropTable('Sys_Location');
  }
};