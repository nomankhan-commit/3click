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
   return queryInterface.bulkInsert('User_Profile', 
   [
     {
      User_Id: "1",
      First_Name: "Salim",
      Last_Name: "Sherali",
      Verify_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1

     },
     {
       
      User_Id: "2",
      First_Name: "kaaran",
      Last_Name: "",
      Verify_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
       
      User_Id: "3",
      First_Name: "sarosh",
      Last_Name: "",
      Verify_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
       
      User_Id: "4",
      First_Name: "usman",
      Last_Name: "",
      Verify_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
       
      User_Id: "5",
      First_Name: "imran",
      Last_Name: "",
      Verify_Date: new Date(),
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },     
     {
      
     User_Id: "6",
     First_Name: "adeem",
     Last_Name: "",
     Verify_Date: new Date(),
     Created_By: 1,
     Created_Date: new Date(),
     Is_Active: 1
    },  
    {
     
    User_Id: "7",
    First_Name: "kaaran 2",
    Last_Name: "",
    Verify_Date: new Date(),
    Created_By: 1,
    Created_Date: new Date(),
    Is_Active: 1
   },
   ], {});
 },

 down: (queryInterface, Sequelize) => {
   /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.bulkDelete('People', null, {});
   */
   return queryInterface.bulkDelete('User_Profile', null, {});
 }
};
