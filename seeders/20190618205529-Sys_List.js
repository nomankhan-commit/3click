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

  var tem_id =[];
  
  var comp_rate = {
		"0.5":89.95
		,"1":92.19875
		,"2":94.50371875
		,"3":96.86631172
		,"4":99.28796951
		,"5":104.252368
		,"6":109.4649864
		,"7":114.9382357
		,"8":123.5586034
		,"9":132.8254986
		,"10":146.1080485
	}

	var comp_rate_inc = {
	
		"0.5":2.25,
		"1":2.30625,
		"2":2.36390625,
		"3":2.423003906,
		"4":2.483579004,
		"5":2.607757954,
		"6":2.738145852,
		"7":2.875053144,
		"8":3.09068213,
		"9":3.32248329,
		"10":3.654731619
	
	};



	var click_cut = {
		"0.5":20,
		"1":20.5,
		"2":21.0125,
		"3":21.5378125,
		"4":22.07625781,
		"5":23.1800707,
		"6":24.33907424,
		"7":25.55602795,
		"8":27.47273005,
		"9":29.5331848,
		"10":32.48650328
	};

	var click_cut_inc ={
		"0.5":0.25,
		"1":0.25625,
		"2":0.26265625,
		"3":0.269222656,
		"4":0.275953223,
		"5":0.289750884,
		"6":0.304238428,
		"7":0.319450349,
		"8":0.343409126,
		"9":0.36916481,
		"10":0.406081291
	};
	
	var ind_rate = {
		"0.5":69.95,
		"1":71.69875,
		"2":73.49121875,
		"3":75.32849922,
		"4":77.2117117,
		"5":81.07229728,
		"6":85.12591215,
		"7":89.38220776,
		"8":96.08587334,
		"9":103.2923138,
		"10":113.6215452
	
	};
	
	var ind_rate_inc = {
		"0.5":2,
		"1":2.05,
		"2":2.10125,
		"3":2.15378125,
		"4":2.207625781,
		"5":2.31800707,
		"6":2.433907424,
		"7":2.555602795,
		"8":2.747273005,
		"9":2.95331848,
		"10":3.248650328

	
	};


  var seed_data =  
   [
     //Request_Status 5

     {
      
      List_Name: "Status", 
      List_Value: "Pending",//1
      List_Type_Id: 5,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1

     },
     { 
     List_Name: "Status",
      List_Value: "In Progress",//2
      List_Type_Id: 5,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
      List_Name: "Status",
      List_Value: "Completed",//3
      List_Type_Id: 5,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
      List_Name: "Status",
      List_Value: "Cancel",//4
      List_Type_Id: 5,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },

     
     //Accept_Status 6

     {
      
      List_Name: "Status",
      List_Value: "Pending",//5
      List_Type_Id: 6,
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1

     },
     { 
      List_Name: "Status",
      List_Value: "Approved",//6
      List_Type_Id: 6,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     { 
     List_Name: "Status",
      List_Value: "In Progress",//7
      List_Type_Id: 6,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     {
      List_Name: "Status",
      List_Value: "Completed",//8
      List_Type_Id: 6,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },
     
     {
      List_Name: "Status",
      List_Value: "Cancel",//9
      List_Type_Id: 6,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
     },

     
      //Ride_Status 7

      {
      
        List_Name: "Status",
        List_Value: "Pending",//10
        List_Type_Id: 7,
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
  
       },
       
       { 
        List_Name: "Status",
        List_Value: "In Progress",//11
        List_Type_Id: 7,  
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
       },
       {
        List_Name: "Status",
        List_Value: "Completed",//12
        List_Type_Id: 7,  
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
       },
       {
        List_Name: "Status",
        List_Value: "Cancel",//13
        List_Type_Id: 7,  
        Created_By: 1,
        Created_Date: new Date(),
        Is_Active: 1
       },

       

   ];
   

   tem_id = [];
    //Weight_List 

   seed_data.push({
    List_Name: "1/2 Ton",
    List_Value: "0.5",
    List_Type_Id: 8,  
    Created_By: 1,
    Created_Date: new Date(),
    Is_Active: 1
   });

   tem_id[0] = 14;

  
   for(i=1;i<=10;i++){

    
    seed_data.push({
      List_Name: i+" Ton",
      List_Value: i,
      List_Type_Id: 8,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
    });

    tem_id.push(14+i);

   }

   //Weight_Rate
    
   for(var i=0;i<tem_id.length;i++){

      

    seed_data.push({
      List_Name: tem_id[i], //list_id
      List_Value:(i==0)?comp_rate["0.5"]:comp_rate[i],//amount on default kg
      List_Custom_Value1:(i==0)?comp_rate_inc["0.5"]:comp_rate_inc[i], //increase amount after increase of default kg
      List_Custom_Value2:15, // default kg
      List_Custom_Value3:3,//role_id
      List_Type_Id: 9,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
    });

    seed_data.push({
      List_Name: tem_id[i], //list_id
      List_Value:(i==0)?ind_rate["0.5"]:ind_rate[i], //amount on default kg
      List_Custom_Value1:(i==0)?ind_rate_inc["0.5"]:ind_rate_inc[i], //increase amount after increase of default kg
      List_Custom_Value2:15, // default kg
      List_Custom_Value3:4,//role_id
      List_Type_Id: 9,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
    });

   }

   // Weight_Rate_Margin

   for(var i=0;i<tem_id.length;i++){

      
    seed_data.push({
      List_Name: tem_id[i], //list_id
      List_Value: (i==0)?click_cut["0.5"]:click_cut[i], //Margin amount on default kg 
      List_Custom_Value1: (i==0)?click_cut_inc["0.5"]:click_cut[i],//increase Margin amount after increase of default kg
      List_Custom_Value2:15, // default kg
      List_Type_Id: 10,  
      Created_By: 1,
      Created_Date: new Date(),
      Is_Active: 1
    });

   }

   tem_id = [];

   seed_data.push({
    List_Name: "Status",
    List_Value: "Arrived",//58
    List_Type_Id: 6,  
    Created_By: 1,
    Created_Date: new Date(),
    Is_Active: 1
   },);

   return queryInterface.bulkInsert('Sys_List',seed_data  , {});
  
   },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Sys_List', null, {});
  }
  
};
