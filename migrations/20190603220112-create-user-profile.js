'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Profile', {
      
      User_Profile_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      First_Name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      Last_Name: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      User_Title: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      User_Address: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      Is_Verify: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Verify_Date: {
        type: Sequelize.DATE,
        allowNull: true,
        default:Date.now
      },
      Verify_link: {
        type: Sequelize.STRING(1000),
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
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('User_Profile');
  }
};