var helper = require('../../../helper/helper');
var setting = require('../../../config/setting');
var models = require('../../../models');
const Sequelize = require('sequelize');
var notification = require('../../../helper/notification');
const Op = Sequelize.Op;

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};

//Get end_ride API V1 (for driver role)

exports.end_ride = async function (req, res) {


    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let request_id = req.body.ride_id;
    let weight = req.body.weight;
    let km = req.body.km;
    let user_type = req.body.user_sub_type;

    req.checkBody('ride_id', 'Ride Id is required').notEmpty();
    req.checkBody('weight', 'Weight is required').notEmpty();
    req.checkBody('km', 'Kilometer is required').notEmpty();


    var Schema = {
        "user_sub_type": {
            in: 'body',
            matches: {
                options: [/\b(?:0|1)\b/],
                errorMessage: "User Sub Type Required!"
            }
        }
    }

    var role_id = (user_type == 1) ? 3 : (user_type == 0) ? 4 : 0;

    req.check(Schema);

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {





        // return;


        // check from DB
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var Accept_Id = 0;
        var Ride_Id = 0;
        var amount = 0;
        var Requested_By = 0;




        //   res.send(JSON.stringify(return_data));


        await models.Rms_Accept.findOne({
            as: "Rms_Accept",
            where: { Is_Active: 1, Accepted_By: token_data.user_id, Request_Id: request_id, Accept_Status_Id: 7 },
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



            await models.Sys_List.findOne({
                where: { List_Value: weight, List_Type_Id: [8], Is_Active: 1 },
                // attributes: ['Role_Id'],
                attributes: [
                    "List_Id"
                ],
                plain: true,
                include: [
                    {
                        model: models.Sys_List, as: "Weight_Rate"
                        , attributes: ['List_Value', 'List_Custom_Value1', 'List_Custom_Value2']
                        , where: { List_Type_Id: 9, List_Custom_Value3: role_id, Is_Active: 1 }
                        , required: false
                    },

                ]

            }).then(data => {


                if (data != null) {

                    if (data.lenght != 0) {

                        amount = 0;

                        if (parseFloat(km) <= data.Weight_Rate.List_Custom_Value2) {
                            amount = parseFloat(data.Weight_Rate.List_Value);
                            // console.log(amount);


                        } else {
                            var rem_km = parseFloat(km) - data.Weight_Rate.List_Custom_Value2;
                            amount = parseFloat(data.Weight_Rate.List_Value) + parseFloat((rem_km * data.Weight_Rate.List_Custom_Value1));
                            // console.log(amount);
                        }

                    } else {

                        return_data.error = "Error in calculating amount";

                    }
                } else {

                    return_data.error = "Error in calculating amount";
                }


            }).catch(err => {
                return_data.error = err;
            });


            if (amount != 0) {


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

                    // amount =  amount.toFixed(2);

                    var customer_id = 0;

                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: Requested_By, Field_Id: 9 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if (data != null) {
                            customer_id = data.Field_Value;
                        }


                    }).catch(err => {
                        //return_data.error = err;
                    });
                   
                    const keyPublishable = setting.payment.stripe.publishable_key;
                    const keySecret = setting.payment.stripe.secret_key;

                    const stripe = require("stripe")(keySecret);

                    var tem_amount =  Math.round(amount)*100;
                    await stripe.charges.create({
                        amount:tem_amount,
                        description: "Payment for ride # " + request_id,
                        currency: "USD",
                        customer: customer_id
                    }).then(charge => {
                        console.log(charge);
                        return_data.status = true;
                    }).catch(err => {
                        return_data.error = "stripe : "+err.raw.message;
                        return_data.status = false;
                    });

                    if (return_data.status) {

                        await models.Rms_Ride.update({
                            End_Time: new Date(),
                            Ride_Status_Id: 12,
                            Total_Fare: amount
                        }, {
                                where: {
                                    Ride_Id: Ride_Id
                                }
                            });

                        await models.Rms_Request.update({
                            End_Time: new Date(),
                            Request_Status_Id: 3
                        }, {
                                where: {
                                    Request_Id: request_id
                                }
                            });


                        await models.Rms_Accept.update({
                            Accept_Status_Id: 8,
                            Accept_Status_Date: new Date(),
                        }, {
                                where: {
                                    Accept_Id: Accept_Id
                                }
                            });


                        notification.send_notification(true, true,
                            {
                                User_Id: Requested_By,
                                Title: 'Ride Ended',
                                Detail: 'Your Ride is Ended For Booking # ' + request_id,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        );

                        return_data.message = "Ride Ended successfully";
                        return_data.error = null;

                    }



                } else {

                    return_data.error = "Ride Id is invalid";
                }


            } else {

                return_data.error = "Amount is zero";
            }



        } else {

            return_data.error = "Accept Id is invalid";
        }





    }


    res.send(JSON.stringify(return_data));
}