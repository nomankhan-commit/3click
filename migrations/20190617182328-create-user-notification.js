'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Notification', {
      User_Notification_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Id: {
        type: Sequelize.INTEGER
      },          
      User_Notification_Title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },       
      User_Notification_Description: {
        type: Sequelize.STRING(5000),
        allowNull: false
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
    return queryInterface.dropTable('User_Notification');
  }
};