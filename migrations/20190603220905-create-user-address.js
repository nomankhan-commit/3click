'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Address', {
     
      User_Adress_Id: {
        
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0

      },
      User_Address_Line1: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      User_Address_Line2: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      User_Address_Type: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    return queryInterface.dropTable('User_Address');
  }
};