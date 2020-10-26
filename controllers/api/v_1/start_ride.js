var helper = require('../../../helper/helper');
var notification = require('../../../helper/notification');
var models = require('../../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};

//Get start_ride API V1 (for driver role)

exports.start_ride = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let request_id = req.body.ride_id;

    req.checkBody('ride_id', 'Ride Id is required').notEmpty();


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
        var Requested_By =0;

        await models.Rms_Accept.findOne({
            as: "Rms_Accept",
            where: { Is_Active: 1, Accepted_By: token_data.user_id, Request_Id: request_id, Accept_Status_Id: 58 },
            attributes: ['Accept_Id'],
            plain: true,
            include: [
                {
                    model: models.Rms_Request,
                    as: "Rms_Request",
                    attributes: ['Requested_By','ETA_Amount']
                }
            ],

        }).then(data => {

            if (data != null) {

                Accept_Id = data.Accept_Id;
                Requested_By = data.Rms_Request.Requested_By;
                return_data.response.total_amount = data.Rms_Request.ETA_Amount;
            }
        }).catch(err => {
            return_data.error = err;
        });

        if (Accept_Id != 0) {

            await models.Rms_Ride.findOne({
                as: "Rms_Ride",
                where: { Is_Active: 1, Accept_Id: Accept_Id, Ride_Status_Id: 11 },
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

                await models.Rms_Ride.update({
                    Start_Time: new Date(),
                }, {
                        where: {
                            Ride_Id: Ride_Id
                        }
                    });


                    await models.Rms_Accept.update({
                        Accept_Status_Id: 7,
                        Accept_Status_Date: new Date(),
                    }, {
                            where: {
                                Accept_Id: Accept_Id
                            }
                        });

                return_data.status = true;

                return_data.response.total_time = 0 + "";
                return_data.response.total_distance = 0 + "";
               

                notification.send_notification(true,true,
                {   User_Id:Requested_By,
                        Title:'Ride Started',
                        Detail:'Your Ride is Started For Booking # '+request_id,
                        Created_By : token_data.user_id,
                        Created_Date : new Date(),
                        Is_Active : 1
                    }
                );

                return_data.message = "Ride Started successfully";
                return_data.error = null;

            } else {

                return_data.error = "Ride Id is invalid";
            }






        } else {

            return_data.error = "Accept Id is invalid";
        }





    }


    res.send(JSON.stringify(return_data));

}