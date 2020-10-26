'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sec_Role_Ativity', {
      Role_Activity_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      Role_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Activity_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Option_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Created_By: {
        type: Sequelize.INTEGER
      },
      Created_Date: {
        type: Sequelize.DATE
      },
      Modified_By: {
        type: Sequelize.INTEGER
      },
      Modified_Date: {
        type: Sequelize.DATE
      },
      Is_Active: {
        type: Sequelize.INTEGER
      },
    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sec_Role_Ativity');
  }
};