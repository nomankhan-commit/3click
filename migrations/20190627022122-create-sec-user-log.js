'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sec_User_Log', {
      User_Log_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      User_Id: {
        type: Sequelize.INTEGER
      },
      Login_Time: {
        type: Sequelize.DATE
      },
      User_Log_Token: {
        type: Sequelize.STRING
      },
      User_Log_App: {
        type: Sequelize.STRING
      },
      User_Log_Device: {
        type: Sequelize.STRING
      },
      User_Log_Machine_Ip: {
        type: Sequelize.STRING
      },
      Logout_Time: {
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
    return queryInterface.dropTable('Sec_User_Log');
  }
};