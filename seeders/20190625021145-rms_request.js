'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Rms_Request', 
   [
     {
      
      From_Latitude: "123446",
      From_Longitude:"78946",
      From_Location: "abc",
      To_Latitude: "123446",
      To_Longitude:"78946",
      To_Location: "xyz",
      Item_Weight: "5",
      ETA_Amount: 104.25,
      Shipping_Type_Id: 0,
      Promo_Id: 0,
      Requested_By: 1,
      Requested_Date: new Date(),
      Requested_Expiry: new Date(),
      Request_Status_Id: 1,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     { 
      
      From_Latitude: "123446",
      From_Longitude:"78946",
      From_Location: "abc",
      To_Latitude: "123446",
      To_Longitude:"78946",
      To_Location: "xyz",
      Item_Weight: "5",
      ETA_Amount: 104.25,
      Shipping_Type_Id: 0,
      Promo_Id: 0,
      Requested_By: 1,
      Requested_Date: new Date(),
      Requested_Expiry: new Date(),
      Request_Status_Id: 2,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     }, { 
      
      From_Latitude: "123446",
      From_Longitude:"78946",
      From_Location: "abc",
      To_Latitude: "123446",
      To_Longitude:"78946",
      To_Location: "xyz",
      Item_Weight: "5",
      ETA_Amount: 104.25,
      Shipping_Type_Id: 0,
      Promo_Id: 0,
      Requested_By: 1,
      Requested_Date: new Date(),
      Requested_Expiry: new Date(),
      Request_Status_Id: 2,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
     
      From_Latitude: "123446",
      From_Longitude:"78946",
      From_Location: "abc",
      To_Latitude: "123446",
      To_Longitude:"78946",
      To_Location: "xyz",
      Item_Weight: "5",
      ETA_Amount: 104.25,
      Shipping_Type_Id: 0,
      Promo_Id: 0,
      Requested_By: 1,
      Requested_Date: new Date(),
      Requested_Expiry: new Date(),
      Request_Status_Id: 3,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      
      From_Latitude: "123446",
      From_Longitude:"78946",
      From_Location: "abc",
      To_Latitude: "123446",
      To_Longitude:"78946",
      To_Location: "xyz",
      Item_Weight: "5",
      ETA_Amount: 104.25,
      Shipping_Type_Id: 0,
      Promo_Id: 0,
      Requested_By: 1,
      Requested_Date: new Date(),
      Requested_Expiry: new Date(),
      Request_Status_Id: 4,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     }
     
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Rms_Request', null, {});
    */
   return queryInterface.bulkDelete('Rms_Request', null, {});
  }
};
