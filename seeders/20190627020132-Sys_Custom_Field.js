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

    return queryInterface.bulkInsert('Sys_Custom_Field', 
      [
        {
          Field_Name: "User_City", //1
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Age", //2
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Vehicle_Register", //3
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Vehicle_Insurance", //4
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Certification", //5
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_License", //6
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Description", //7
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },
        {
          Field_Name: "User_Device_Id", //8
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
          Created_By: 1,
          Created_Date: new Date(),
          Is_Active: 1

        },{
          Field_Name: "User_Stripe_Customer_Id", //9
          Field_Detail: "",
          Field_Datatype: "text",
          Field_Formate: "",
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
    return queryInterface.bulkDelete('Sys_Custom_Field', null, {});
  }
};
