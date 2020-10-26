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

  
    return queryInterface.bulkInsert('User', 
    [
      {
        User_Name: "salim@viftech.com.pk",
        Email: "salim@viftech.com.pk",
        Password: "salim@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "kaaran@viftech.com.pk",
        Email: "kaaran@viftech.com.pk",
        Password: "kaaran@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "admin@admin.com",
        Email: "admin@admin.com",
        Password: "admin@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "company1@company.com",
        Email: "company1@company.com",
        Password: "admin@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "company2@company.com",
        Email: "company2@company.com",
        Password: "admin@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "company3@company.com",
        Email: "company3@company.com",
        Password: "admin@123",
        User_Parent_Id: 0,
        Signup_Date: new Date(),
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
      },
      {
        User_Name: "deiver1company3@company.com",
        Email: "deiver1company3@company.com",
        Password: "admin@123",
        User_Parent_Id: 6,
        Signup_Date: new Date(),
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
    return queryInterface.bulkDelete('User', null, {});
  }
};
