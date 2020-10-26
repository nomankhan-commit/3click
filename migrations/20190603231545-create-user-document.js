'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Document', {
   
      User_Document_Id: {
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
      Document_Type: {
        type: Sequelize.ENUM('profile_image'),
        allowNull: false
      },
      Document_Detail: {
        type: Sequelize.STRING(5000),
        allowNull: true
      },
      User_Document: {
        type: Sequelize.BLOB(),
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
    return queryInterface.dropTable('User_Document');
  }
};