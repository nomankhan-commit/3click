'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sys_Country',
      [
        {
          Country_Name: "Australia",
          Country_Code: "AU",
          Country_Short_Code: "AU",
          Country_Dial_Code: "61",
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

    return queryInterface.bulkDelete('Sys_Country', null, {});
  }
};
