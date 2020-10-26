var helper = require('../../../helper/helper');
var models = require('../../../models');
var notification = require('../../../helper/notification');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var notification = require('../../../helper/notification');

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};

//Get accept_reject_ride API V1 (for driver role)

exports.accept_reject_ride = async function (req, res) {

    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let request_id = req.body.ride_id;
    let is_accept = req.body.is_accept;
    let device_token = req.body.device_token;
    req.checkBody('ride_id', 'ride id is required').notEmpty();
    
    req.checkBody('device_token', 'Device Token is required').notEmpty();
    var Schema = {
        "is_accept": {
            in: 'body',
            matches: {
                options: [/\b(?:true|false)\b/],
                errorMessage: "is accept Required!"
            }
        }
    }

    req.checkBody('ride_id', 'Ride Id is required').notEmpty();

    req.check(Schema);

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // check from DB
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var ride_status = (is_accept == 'true') ? 1 : 0;
        var Accept_Id = 0;
        var Requested_By =0;

        await models.Rms_Accept.findOne({
            as: "Rms_Accept",
            where: { Is_Active: 1, Accepted_By: token_data.user_id, Request_Id: request_id, Accept_Status_Id: 5 },
            attributes: ['Accept_Id'],
            include: [
                {
                    model: models.Rms_Request,
                    as: "Rms_Request",
                    attributes: ["To_Location", "From_Location", "ETA_Amount",'Requested_By']
                }
            ],
            plain: true,

        }).then(data => {

            if (data != null) {


                return_data.response.pickup_location = data.Rms_Request.To_Location + "";
                return_data.response.drop_off_ocation = data.Rms_Request.From_Location + "";
                return_data.response.estimated_amount = data.Rms_Request.ETA_Amount + "";
                Requested_By = data.Rms_Request.Requested_By;
                Accept_Id = data.Accept_Id;
            }
        }).catch(err => {
            return_data.error = err;
        });

        if (Accept_Id != 0) {

            var Ride_Status_Id = 10;
            if (ride_status == 0) {

                Ride_Status_Id = 13;
            }

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
                    Ride_Status_Id: Ride_Status_Id,
                    Created_By: 0,
                    Created_Date: new Date(),
                    Is_Active: 1



                }
            ).then(data => {

                Ride_Id = data.Ride_Id;


            }).catch(err => {
                return_data.error = err;
            });

            if (Ride_Id != 0) {

                var Accept_Status_Id = 6;
                if (ride_status == 0) {

                    Accept_Status_Id = 9;
                }

                await models.Rms_Accept.update({
                    Accept_Status_Id: Accept_Status_Id,
                    Accept_Status_Date: new Date(),
                }, {
                        where: {
                            Accept_Id: Accept_Id
                        }
                    });

                var Request_Status_Id = 2;
                if (ride_status == 0) {

                    Request_Status_Id = 4;
                }

                await models.Rms_Request.update({
                    Request_Status_Id: Request_Status_Id,
                }, {
                        where: {
                            Request_Id: request_id
                        }
                    });


                    if(ride_status == 1){

                          
                        //customer
    
                        notification.send_notification(true,true,
                            {   User_Id:Requested_By,
                                Title:'Accepted Booking',
                                Detail:'Your Booking is Accepted. Booking # '+request_id,
                                Created_By : token_data.user_id,
                                Created_Date : new Date(),
                                Is_Active : 1
                            }
                        );

                    }else{

                        //customer

                        notification.send_notification(true,true,
                            {   User_Id:Requested_By,
                                Title:'Booking Rejected',
                                Detail:'Your Booking # '+request_id+' is rejected',
                                Created_By : token_data.user_id,
                                Created_Date : new Date(),
                                Is_Active : 1
                            }
                        );
                    }

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

                   
           
                return_data.status = true;
                return_data.message = "Susscess";
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