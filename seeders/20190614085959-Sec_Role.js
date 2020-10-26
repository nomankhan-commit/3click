'use strict';
// npx sequelize-cli db:seed:all
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

       */
      return queryInterface.bulkInsert('Sec_Role', 
      [
        {
        Role_Name: "Admin",
        Role_Detail: "-",
        Created_By: "1",
        Created_Date: new Date(),
        Is_Active: 1

        },{
          Role_Name: "Customer",
          Role_Detail: "-",
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1
  
        },{
          Role_Name: "Company",
          Role_Detail: "-",
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1
  
        },{
          Role_Name: "Driver",
          Role_Detail: "-",
          Created_By: "1",
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
    */
      return queryInterface.bulkDelete('Sec_Role', null, {});
    
  }
};
