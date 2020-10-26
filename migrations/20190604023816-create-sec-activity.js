'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sec_Ativity', {
      
      Activity_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Activity_Name: {
        type: Sequelize.STRING(200)
      },
      Activity_Code: {
        type: Sequelize.INTEGER
      },
      Activity_Parent_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Activity_Detail: {
        type: Sequelize.STRING(200)
      },
      Activity_Type_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
        default:0
      },
      Activity_X_Postion: {
        type: Sequelize.INTEGER
      },
      Activity_Y_Postion: {
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
    return queryInterface.dropTable('Sec_Ativity');
  }
};