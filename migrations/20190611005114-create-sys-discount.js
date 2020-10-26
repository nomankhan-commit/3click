'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_Discount', {
      Discount_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      Discount_Name: {
        type: Sequelize.STRING
      },
      Discount_Type: {
        type: Sequelize.STRING
      },
      Discount_Value: {
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
    return queryInterface.dropTable('Sys_Discount');
  }
};