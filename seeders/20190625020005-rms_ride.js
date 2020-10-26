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
     return queryInterface.bulkInsert('Rms_Ride', 
     [
       {
        Arrived_Time: null,
        Start_Time: null,
        End_Time: null,
        Distance: 0,
        Duration: 0,
        Fare_Rate: 0,
        Waiting_Charge: 0,
        Surge_Charge: 0,
        Cancellation_Charge: 0,
        Multi_Location_Charge: 0,
        Total_Fare: 0,
        Promo_Amount: 0,
        Paid_Amount: 0,
        Accept_Id: 1,
        Ride_Status_Id: 10,
        Remarks: "",
        Created_By: 2,
        Created_Date: new Date(),       
        Is_Active: 1

       },
       { 

        Arrived_Time: null,
        Start_Time: null,
        End_Time: null,
        Distance: 0,
        Duration: 0,
        Fare_Rate: 0,
        Waiting_Charge: 0,
        Surge_Charge: 0,
        Cancellation_Charge: 0,
        Multi_Location_Charge: 0,
        Total_Fare: 0,
        Promo_Amount: 0,
        Paid_Amount: 0,
        Accept_Id: 2,
        Ride_Status_Id: 10,
        Remarks: "",
        Created_By: 2,
        Created_Date: new Date(),       
        Is_Active: 1


       },{
        Arrived_Time: new Date(),
        Start_Time: new Date(),
        End_Time: null,
        Distance: 0,
        Duration: 0,
        Fare_Rate: 0,
        Waiting_Charge: 0,
        Surge_Charge: 0,
        Cancellation_Charge: 0,
        Multi_Location_Charge: 0,
        Total_Fare: 0,
        Promo_Amount: 0,
        Paid_Amount: 0,
        Accept_Id: 3,
        Ride_Status_Id: 11,
        Remarks: "",
        Created_By: 2,
        Created_Date: new Date(),       
        Is_Active: 1

       },{
        Arrived_Time: new Date(),
        Start_Time: new Date(),
        End_Time: new Date(),
        Distance: 55,
        Duration: 50,
        Fare_Rate: 104.25,
        Waiting_Charge: 0,
        Surge_Charge: 0,
        Cancellation_Charge: 0,
        Multi_Location_Charge: 0,
        Total_Fare: 104.25,
        Promo_Amount: 0,
        Paid_Amount: 104.25,
        Accept_Id: 4,
        Ride_Status_Id: 12,
        Remarks: "",
        Created_By: 2,
        Created_Date: new Date(),       
        Is_Active: 1
       }
       ,{
        Arrived_Time: null,
        Start_Time: null,
        End_Time: null,
        Distance: 0,
        Duration: 0,
        Fare_Rate: 0,
        Waiting_Charge: 0,
        Surge_Charge: 0,
        Cancellation_Charge: 0,
        Multi_Location_Charge: 0,
        Total_Fare: 0,
        Promo_Amount: 0,
        Paid_Amount: 0,
        Accept_Id: 2,
        Ride_Status_Id: 13,
        Remarks: "",
        Created_By: 2,
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
   return queryInterface.bulkDelete('Rms_Ride', null, {});
  }
};
