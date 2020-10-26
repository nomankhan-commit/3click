'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rms_Request', {
      Request_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   
      From_Latitude: {
        type: Sequelize.STRING(200)
      },
      From_Location: {
        type: Sequelize.STRING(200)
      },
      To_Location: {
        type: Sequelize.STRING(200)
      },
      From_Longitude: {
        type: Sequelize.STRING(200)
      },
      To_Latitude: {
        type: Sequelize.STRING(200)
      },
      To_Longitude: {
        type: Sequelize.STRING(200)
      },
      Item_Weight: {
        type: Sequelize.DECIMAL(10,2)
      },
      ETA_Amount: {
        type: Sequelize.DECIMAL(10,2),
      },
      Shipping_Type_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Promo_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default:0
      },
      Requested_By: {
        type: Sequelize.INTEGER
      },
      Requested_Date: {
        type: Sequelize.DATE
      },
      Requested_Expiry: {
        type: Sequelize.DATE
      },
      Request_Status_Id: {
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
    return queryInterface.dropTable('Rms_Request');
  }
};