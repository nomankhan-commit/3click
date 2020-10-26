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
   return queryInterface.bulkInsert('Rms_Accept', 
   [
     {

      Request_Id: 1,
      Current_Latitude:  "123446",
      Current_Longitude: "797979",
      Accepted_By: 2,
      Reference_Accept_Id: 0,
      Accept_Status_Id: 5,
      Accept_Status_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     { 
      Request_Id: 2,
      Current_Latitude:  "123446",
      Current_Longitude: "797979",
      Accepted_By: 2,
      Reference_Accept_Id: 0,
      Accept_Status_Id: 6,
      Accept_Status_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      Request_Id: 3,
      Current_Latitude:  "123446",
      Current_Longitude: "797979",
      Accepted_By: 2,
      Reference_Accept_Id: 0,
      Accept_Status_Id: 7,
      Accept_Status_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },{
      Request_Id: 4,
      Current_Latitude:  "123446",
      Current_Longitude: "797979",
      Accepted_By: 2,
      Reference_Accept_Id: 0,
      Accept_Status_Id: 8,
      Accept_Status_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     }
     ,{
      Request_Id: 5,
      Current_Latitude:  "123446",
      Current_Longitude: "797979",
      Accepted_By: 2,
      Reference_Accept_Id: 0,
      Accept_Status_Id: 9,
      Accept_Status_Date: new Date(),
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
      return queryInterface.bulkDelete('Rms_Accept', null, {});
    */
   return queryInterface.bulkDelete('Rms_Accept', null, {});
  }
};
