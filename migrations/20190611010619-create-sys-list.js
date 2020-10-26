'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_List', {
     List_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      List_Name: {
        type: Sequelize.STRING(1000)
      },
      List_Value: {
        type: Sequelize.STRING(1000)
      },
      List_Custom_Value1: {
        type: Sequelize.STRING(1000)
      },
      List_Custom_Value2: {
        type: Sequelize.STRING(1000)
      },
      List_Custom_Value3: {
        type: Sequelize.STRING(1000)
      },
      List_Type_Id: {
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
    return queryInterface.dropTable('Sys_List');
  }
};