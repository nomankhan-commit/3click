'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_Promo', {
      User_Promo_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      Promo_Id: {
        type: Sequelize.INTEGER,
        default:0,
        allowNull:false
        
      },
      User_Id: {
        type: Sequelize.INTEGER,
        default:0,
        allowNull:false
      },
      Promo_Start_Date: {
        type: Sequelize.DATE
      },
      Promo_Expiry_Date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('User_Promo');
  }
};