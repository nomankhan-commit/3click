'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sec_User_Log_Detail', {
      User_Log_Detail_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },     
      User_Log_Id: {
        type: Sequelize.INTEGER
      },
      Table_Name: {
        type: Sequelize.STRING(1000)
      },
      Crud_Operation: {
        type: Sequelize.STRING(1000)
      },
      SQL_Query: {
        type: Sequelize.STRING(10000)
      },
      Activity_Id: {
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
    return queryInterface.dropTable('Sec_User_Log_Detail');
  }
};