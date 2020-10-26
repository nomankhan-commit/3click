'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Contact', {
      User_Contact_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      Contact_Type: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      User_Id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Is_Primary: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      User_Contact_Value1: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      User_Contact_Value2: {
        type: Sequelize.STRING(500),
        allowNull: true
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
    return queryInterface.dropTable('User_Contact');
  }
};