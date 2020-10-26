'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Location', {
      User_Location_Id: {
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
      Location_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Is_Favorite: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('User_Location');
  }
};