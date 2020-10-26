'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sys_Comment', {
      
      User_Comment_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Id: {
        allowNull: false,
         type: Sequelize.INTEGER
      },
      Comment_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Other_Comment: {
        type: Sequelize.STRING(200),
        //allowNull: false,
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
    return queryInterface.dropTable('Sys_Comment');
  }
};