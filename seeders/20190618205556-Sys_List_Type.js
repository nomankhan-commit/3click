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

    
   return queryInterface.bulkInsert('Sys_List_Type', 
   [
     {
      List_Type: "Payment_Mode",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     { 
      List_Type: "Shipping_Type",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Curreny",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Promo",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Request_Status",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Accept_Status",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Ride_Status",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Weight_List",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Weight_Rate",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      List_Type: "Weight_Rate_Margin",
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
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Sys_List_Type', null, {});
  }
  
};



