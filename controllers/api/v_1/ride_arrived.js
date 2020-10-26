var helper = require('../../../helper/helper');
var models = require('../../../models');
var notification = require('../../../helper/notification');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};

//Get ride_arrived API V1 (for driver role)

exports.ride_arrived = async function (req, res) {

    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let request_id = req.body.ride_id;
    let device_token = req.body.device_token;

    req.checkBody('ride_id', 'Ride Id is required').notEmpty();
    req.checkBody('device_token', 'Device Token is required').notEmpty();


    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // check from DB
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var Accept_Id = 0;
        var Ride_Id = 0;
        var Is_Running = false;



        await models.Rms_Accept.findAll({
            as: "Rms_Accept",
            where: { Is_Active: 1, Accepted_By: token_data.user_id, Accept_Status_Id: [7, 58] },
            attributes: ['Accept_Id'],
            plain: true,

        }).then(data => {

            if (data != null) {
                if (data.length != 0) {

                    Is_Running = true;

                }



            }
        }).catch(err => {

        });


        if (Is_Running == false) {

            var Requested_By = 0;

            await models.Rms_Accept.findOne({
                as: "Rms_Accept",
                where: { Is_Active: 1, Accepted_By: token_data.user_id, Request_Id: request_id, Accept_Status_Id: 6 },
                attributes: ['Accept_Id'],
                plain: true,
                include: [
                    {
                        model: models.Rms_Request,
                        as: "Rms_Request",
                        attributes: ['Requested_By']
                    }
                ],

            }).then(data => {

                if (data != null) {

                    Accept_Id = data.Accept_Id;
                    Requested_By = data.Rms_Request.Requested_By;
                }
            }).catch(err => {
                return_data.error = err;
            });

            if (Accept_Id != 0) {

                console.log(Accept_Id);

                await models.Rms_Ride.findOne({
                    as: "Rms_Ride",
                    where: { Is_Active: 1, Accept_Id: Accept_Id, Ride_Status_Id: 10 },
                    attributes: ['Ride_Id'],
                    plain: true,

                }).then(data => {

                    if (data != null) {

                        Ride_Id = data.Ride_Id;
                    }
                }).catch(err => {
                    return_data.error = err;
                });

                if (Ride_Id != 0) {
                    await models.Rms_Accept.update({
                        Accept_Status_Id: 58,
                        Accept_Status_Date: new Date(),
                    }, {
                            where: {
                                Accept_Id: Accept_Id
                            }
                        });



                    await models.Rms_Ride.update({
                        Ride_Status_Id: 11,
                        Arrived_Time: new Date(),
                    }, {
                            where: {
                                Ride_Id: Ride_Id
                            }
                        });

                    return_data.status = true;
                    return_data.message = "Rider Arrived";
                    return_data.error = null;

                    notification.send_notification(true, true,
                        {
                            User_Id: Requested_By,
                            Title: 'Rider Arrived',
                            Detail: 'Your Rider is Arrived For Booking # ' + request_id,
                            Created_By: token_data.user_id,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );


                    await models.User_Custom_Info.update({
                        Field_Value: device_token,
                        Modified_By: token_data.user_id,
                        Modified_Date: new Date()
                    }, {
                        where: {
                            User_Id: token_data.user_id,
                            Is_Active: 1,
                            Field_Id: 8

                        }
                    });


                } else {

                    return_data.error = "Ride Id is invalid";
                }






            } else {

                return_data.error = "Accept Id is in invalid";
            }

        } else {

            return_data.error = "Ride is already in progress";
        }



    }


    res.send(JSON.stringify(return_data));

}