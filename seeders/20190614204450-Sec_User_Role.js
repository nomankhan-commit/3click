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
    
    return queryInterface.bulkInsert('Sec_User_Role', 
    [
      {
        User_Id: 1,
        Role_Id: 2,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      }, {
        User_Id: 2,
        Role_Id: 4,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      }, {
        User_Id: 3,
        Role_Id: 1,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      }, {
        User_Id: 4,
        Role_Id: 3,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      }, {
        User_Id: 5,
        Role_Id: 3,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      },{
        User_Id: 6,
        Role_Id: 3,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1

      },{
        User_Id: 7,
        Role_Id: 4,
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
    return queryInterface.bulkDelete('Sec_User_Role', null, {});
  }
};
