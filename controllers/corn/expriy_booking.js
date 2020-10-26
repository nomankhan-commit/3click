
var helper = require('../../helper/helper');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.index = async function (req, res) {

    // var return_data = helper.Cms_Default_Return_Data();
    // return_data.session_user_data = req.session.user_data;
    var return_data = [];

    var db_restult = [];

    await models.sequelize.query("SELECT Rms_Request.`Request_Id` as 'Request_Id' FROM Rms_Request WHERE (Created_Date+INTERVAL 30 MINUTE) < NOW() AND `Request_Status_Id` = 1",
        { type: models.sequelize.QueryTypes.SELECT })
        .then(data => {

            db_restult = data;

        });



    if (db_restult.length != 0) {

        db_restult.forEach(async element => {

            var Accept_Id = 0;
            return_data.push(element.Request_Id);
            
            await models.Rms_Accept.findAll({
                where: { Request_Id: element.Request_Id, Is_Active: 1, Accept_Status_Id: 5 },
                attributes: ['Accept_Id'],
                plain: true,

            }).then(data => {


                if (data != null) {

                    if (data.length != 0) {


                        Accept_Id = data.Accept_Id;



                    }
                } 

            });


            if (Accept_Id != 0) {

                var Ride_Id = 0;

                await models.Rms_Ride.create(
                    {
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
                        Accept_Id: Accept_Id,
                        Ride_Status_Id: 13,
                        Created_By: 0,
                        Created_Date: new Date(),
                        Is_Active: 1



                    }
                ).then(data => {

                    Ride_Id = data.Ride_Id;


                }).catch(err => {

                });

                if (Ride_Id != 0) {


                    await models.Rms_Accept.update({
                        Accept_Status_Id: 9,
                        Reference_Accept_Id: -1,
                        Accept_Status_Date: new Date(),
                    }, {
                            where: {
                                Accept_Id: Accept_Id
                            }
                        });



                    await models.Rms_Request.update({
                        Request_Status_Id: 4,
                    }, {
                            where: {
                                Request_Id: element.Request_Id
                            }
                        });



                }


            }
        });

    }




    res.send(JSON.stringify(return_data));

}
