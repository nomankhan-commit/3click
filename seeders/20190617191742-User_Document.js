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
 
   return queryInterface.bulkInsert('User_Document', 
   [
     {
      User_Id: "1",
      Document_Type: "profile_image",
      Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/salim.png",
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
       
       User_Id: "2",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
       Created_By: 1,
       Created_Date: new Date(),
       Is_Active: 1
     },
     {
       
       User_Id: "3",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
       Created_By: 1,
       Created_Date: new Date(),
       Is_Active: 1
     },
     {
       
       User_Id: "4",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
       Created_By: 1,
       Created_Date: new Date(),
       Is_Active: 1
     },
     {
       
       User_Id: "5",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
       Created_By: 1,
       Created_Date: new Date(),
       Is_Active: 1
     },
     {
       
       User_Id: "6",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
       Created_By: 1,
       Created_Date: new Date(),
       Is_Active: 1
     },
     {
       
       User_Id: "7",
       Document_Type: "profile_image",
       Document_Detail: "http://transmissito.codecreators.net:3000/assets/cms/images/profile/kaaran.png",
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
   return queryInterface.bulkDelete('User_Document', null, {});
 }
};
