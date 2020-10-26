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


    return queryInterface.bulkInsert('Sys_State',
      [
        { // 1
          State_Name: "New South Wales",
          State_Code: "NSW",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 2
          State_Name: "Northern Territory",
          State_Code: "NT",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 3
          State_Name: "Queensland",
          State_Code: "Qld",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 4
          State_Name: "South Australia",
          State_Code: "SA",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 5
          State_Name: "Tasmania",
          State_Code: "Tas",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 6
          State_Name: "Victoria",
          State_Code: "Vic",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 7
          State_Name: "Western Australia",
          State_Code: "WA",
          Country_Id: 1,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1

        }, {// 8
          State_Name: "Australian Capital Territory",
          State_Code: "WA",
          Country_Id: 1,
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
    return queryInterface.bulkDelete('Sys_State', null, {});
  }
};
