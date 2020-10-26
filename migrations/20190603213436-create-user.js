'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
   
      User_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_Name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      User_Parent_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Signup_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        default:Date.now
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
        default:2
      }
    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};