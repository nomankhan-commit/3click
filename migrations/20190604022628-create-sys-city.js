'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_City', {
      
      City_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      City_Name: {
        type: Sequelize.STRING(200)
      },
      City_Code: {
        type: Sequelize.INTEGER
      },
      State_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0

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
    return queryInterface.dropTable('Sys_City');
  }
};