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

    var city_arry = [
      { name: 'Sydney', state: '1' },
      { name: 'Melbourne', state: '6' },
      { name: 'Brisbane', state: '3' },
      { name: 'Perth', state: '7' },
      { name: 'Adelaide', state: '4' },
      { name: 'Gold Coast', state: '3' },
      { name: 'Newcastle', state: '1' },
      { name: 'Canberra', state: '8' },
      { name: 'Sunshine Coast', state: '3' },
      { name: 'Wollongong', state: '1' },
      { name: 'Geelong', state: '6' },
      { name: 'Hobart', state: '5' },
      { name: 'Townsville', state: '3' },
      { name: 'Cairns', state: '3' },
      { name: 'Darwin', state: '2' },
      { name: 'Toowoomba', state: '3' },
      { name: 'Ballarat', state: '6' },
      { name: 'Bendigo', state: '6' },
      { name: 'Albury', state: '1' },
      { name: 'Launceston', state: '5' },
      { name: 'Mackay', state: '3' },
      { name: 'Rockhampton', state: '3' },
      { name: 'Bunbury', state: '7' },
      { name: 'Coffs Harbour', state: '1' },
      { name: 'Bundaberg', state: '3' },
      { name: 'Wagga Wagga', state: '1' },
      { name: 'Hervey Bay', state: '3' },
      { name: 'Mildura', state: '6' },
      { name: 'Shepparton', state: '6' },
      { name: 'Port Macquarie', state: '1' },
      { name: 'Gladstone', state: '3' },
      { name: 'Tamworth', state: '1' },
      { name: 'Traralgon', state: '6' },
      { name: 'Orange', state: '1' },
      { name: 'Bowral', state: '1' },
      { name: 'Busselton', state: '7' },
      { name: 'Dubbo', state: '1' },
      { name: 'Warragul', state: '6' },
      { name: 'Geraldton', state: '7' },
      { name: 'Nowra', state: '1' },
      { name: 'Bathurst', state: '1' },
      { name: 'Warrnambool', state: '6' },
      { name: 'Albany', state: '7' },
      { name: 'Devonport', state: '5' },
      { name: 'Kalgoorlie', state: '7' },
      { name: 'Mount Gambier', state: '4' },
      { name: 'Lismore', state: '1' },
      { name: 'Nelson Bay', state: '1' },
      { name: 'Maryborough', state: '3' },
      { name: 'Burnie', state: '5' },
      { name: 'Alice Springs', state: '2' },
      { name: 'Victor Harbor', state: '4' },
      { name: 'Ballina', state: '1' },
      { name: 'Taree', state: '1' },
      { name: 'Morisset', state: '1' },
      { name: 'Armidale', state: '1' },
      { name: 'Goulburn', state: '1' },
      { name: 'Whyalla', state: '4' },
      { name: 'Gympie', state: '3' },
      { name: 'Echuca', state: '6' },
      { name: 'Forster', state: '1' },
      { name: 'Griffith', state: '1' },
      { name: 'Wangaratta', state: '6' },
      { name: 'St Georges Basin', state: '1' },
      { name: 'Grafton', state: '1' },
      { name: 'Yeppoon', state: '3' },
      { name: 'Murray Bridge', state: '4' },
      { name: 'Mount Isa', state: '3' },
      { name: 'Camden Haven', state: '1' },
      { name: 'Broken Hill', state: '1' },
      { name: 'Moe', state: '6' },
      { name: 'Karratha', state: '7' },
      { name: 'Horsham', state: '6' },
      { name: 'Batemans Bay', state: '1' },
      { name: 'Singleton', state: '1' },
      { name: 'Port Lincoln', state: '4' },
      { name: 'Ulladulla', state: '1' },
      { name: 'Bairnsdale', state: '6' },
      { name: 'Warwick', state: '3' },
      { name: 'Kempsey', state: '1' },
      { name: 'Sale', state: '6' },
      { name: 'Ulverstone', state: '5' },
      { name: 'Broome', state: '7' },
      { name: 'Port Hedland', state: '7' },
      { name: 'Port Pirie', state: '4' },
      { name: 'Emerald', state: '3' },
      { name: 'Port Augusta', state: '4' },
      { name: 'Lithgow', state: '1' },
      { name: 'Colac', state: '6' },
      { name: 'Mudgee', state: '1' },
      { name: 'Muswellbrook', state: '1' },
      { name: 'Esperance', state: '7' },
      { name: 'Parkes', state: '1' },
      { name: 'Swan Hill', state: '6' },
      { name: 'Portland', state: '6' },
      { name: 'Kingaroy', state: '3' }
    ]

    var seed_data = [];

    for (var i = 0; i < city_arry.length; i++) {


      seed_data.push(
        {
          City_Name: city_arry[i].name,
          City_Code: "",
          State_Id: city_arry[i].state,
          Created_By: "1",
          Created_Date: new Date(),
          Is_Active: 1
        }


      );

    }

    city_arry = [];

    return queryInterface.bulkInsert('Sys_City', seed_data, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Sys_City', null, {});
  }
};
