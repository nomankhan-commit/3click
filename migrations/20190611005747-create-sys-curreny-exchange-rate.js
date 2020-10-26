'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_Curreny_Exchange_Rate', {
      Exchange_Rate_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   
      Curreny_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Exchange_Rate: {
        type: Sequelize.INTEGER
      },
      Effective_date: {
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
    return queryInterface.dropTable('Sys_Curreny_Exchange_Rate');
  }
};