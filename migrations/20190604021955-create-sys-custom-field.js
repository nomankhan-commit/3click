'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_Custom_Field', {
     
      Field_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Field_Name: {
        type: Sequelize.STRING(200)        
      },
      Field_Detail: {
        type: Sequelize.STRING(200)
      },
      Field_Datatype: {
        type: Sequelize.STRING(20)
      },
      Field_Formate: {
        type: Sequelize.STRING(200)
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
    return queryInterface.dropTable('Sys_Custom_Feild');
  }
};