'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sec_Option', {
      
      Option_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Option_Name: {
        type: Sequelize.STRING(200)
      },
      Option_Code: {
        type: Sequelize.INTEGER
      },
      Option_Detail: {
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
    return queryInterface.dropTable('Sec_Option');
  }
};