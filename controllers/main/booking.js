
var helper = require('../../helper/helper');
var notification = require('../../helper/notification');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');

exports.index_approved = async function (req, res) {



    // if(typeof req.query.token !== 'undefined'){

    // }

    var status_cp = false;
    var Accepted_By = 0;


    try {

        var token = req.params.token;
        var decoded = jwt.verify(token, setting.jwt.secret_booking);
        // console.log(decoded);
        status_cp = false;

        var Request_Id = decoded.ride_id;
        var Role_Id = 0;


        await models.Rms_Accept.findAll({
            where: { Request_Id: Request_Id, Is_Active: 1, Accept_Status_Id: 5 },
            attributes: ['Accept_Id', 'Accepted_By'],
            plain: true,
            include: [
                {
                    model: models.Sec_User_Role, as: "Sec_User_Role"
                    , attributes: ['Role_Id']
                    , where: { Is_Active: 1 }
                    , required: false

                }
            ]

        }).then(data => {



            if (data != null) {

                if (data.length != 0) {

                    console.log(data);

                    Accept_Id = data.Accept_Id;
                    Accepted_By = data.Accepted_By;
                    Role_Id = data.Sec_User_Role.Role_Id;
                    status_cp = true;



                }
            }

        });

    } catch (e) {

        status_cp = false;
        var error_throw = new Error("Invalid User");
        error_throw.code = "405";
        throw error_throw;


    }


    if (status_cp) {

        // console.log(Accepted_By);

        var return_data = helper.Main_Default_Return_Data();

        return_data.Role_Id = Role_Id;

        console.log(Role_Id);



        if (return_data.Role_Id == 3) {

            return_data.user_record = [];
            return_data.token = token;
            return_data.Accepted_By = Accepted_By;

            await models.User.findAll({
                where: { Is_Active: 1, User_Parent_Id: Accepted_By },
                attributes: [

                    'User_Id', 'User_Name'

                ], include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },

                ],
                raw: true

            }).then(data => {


                if (data != null) {


                    if (data.length != 0) {

                        return_data.user_record = data;
                    }

                }

            }).catch(err => {
            });

        } else if (return_data.Role_Id == 4) {

            return_data.status = false;

            var Accept_Id = 0;
            var Ride_Id = 0;
            var db_restult = [];
            await models.Rms_Accept.findAll({
                where: { Request_Id: Request_Id, Is_Active: 1, Accepted_By: Accepted_By, Accept_Status_Id: 5 },
                attributes: ['Accept_Id'],
                plain: true,

            }).then(data => {



                if (data != null) {

                    if (data.length != 0) {


                        Accept_Id = data.Accept_Id;


                    }
                }
            });

            // console.log(Accept_Id);
            if (Accept_Id != 0) {


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
                        Ride_Status_Id: 10,
                        Created_By: Accepted_By,
                        Created_Date: new Date(),
                        Is_Active: 1



                    }
                ).then(data => {

                    Ride_Id = data.Ride_Id;


                }).catch(err => {
                    return_data.error = err;
                });


                if (Ride_Id != 0) {
                    await models.Rms_Accept.update({
                        Accept_Status_Id: 6,
                        // Accepted_By: User_Id,
                        Accept_Status_Date: new Date(),
                    }, {
                            where: {
                                Accept_Id: Accept_Id
                            }
                        });


                    await models.Rms_Request.update({
                        Request_Status_Id: 2,
                    }, {
                            where: {
                                Request_Id: Request_Id
                            }
                        });


                }


                if (return_data.status) {



                    var Requested_By = 0;

                    await models.Rms_Request.findAll({
                        where: { Request_Id: Request_Id, Is_Active: 1 },
                        attributes: ['Requested_By'],
                        plain: true,

                    }).then(data => {



                        if (data != null) {

                            if (data.length != 0) {


                                Requested_By = data.Requested_By;


                            }

                        }

                    });

                    //driver


                    notification.send_notification(true, true,
                        {
                            User_Id: User_Id,
                            Title: 'Accepted Booking',
                            Detail: 'You Have Received A Job. Booking # ' + Request_Id,
                            Created_By: Accepted_By,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );

                    //customer

                    notification.send_notification(true, true,
                        {
                            User_Id: Requested_By,
                            Title: 'Accepted Booking',
                            Detail: 'Your Booking is Accepted. Booking # ' + Request_Id,
                            Created_By: Accepted_By,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );
                }


            }

        }
        res.render('main/message/booking_approved.ejs', return_data);




    } else {
        res.status(200).redirect('/404');
    }

}


exports.index_rejected = async function (req, res) {



    // if(typeof req.query.token !== 'undefined'){

    // }

    var status_cp = false;


    try {

        var token = req.params.token;
        var decoded = jwt.verify(token, setting.jwt.secret_booking);
        // console.log(decoded);
        status_cp = false;

        var Request_Id = decoded.ride_id;

        var Accept_Id = 0;
        var Accepted_By = 0;
        var db_restult = [];
        await models.Rms_Accept.findAll({
            where: { Request_Id: Request_Id, Is_Active: 1, Accept_Status_Id: 5 },
            attributes: ['Accept_Id', 'Accepted_By'],
            plain: true,

        }).then(data => {



            if (data != null) {

                if (data.length != 0) {


                    Accept_Id = data.Accept_Id;
                    Accepted_By = data.Accepted_By;



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
                    Created_By: Accepted_By,
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
                    Accept_Status_Date: new Date(),
                }, {
                        where: {
                            Accept_Id: Accept_Id
                        }
                    });


                var Requested_By = 0;
                await models.Rms_Request.update({
                    Request_Status_Id: 4,
                }, {
                        where: {
                            Request_Id: Request_Id
                        }
                    });



                await models.Rms_Request.findAll({
                    where: { Request_Id: Request_Id },
                    attributes: ['Requested_By'],
                    plain: true,

                }).then(data => {



                    if (data != null) {

                        if (data.length != 0) {


                            Requested_By = data.Requested_By;



                        }
                    }

                });

                if (Requested_By != 0) {
                    notification.send_notification(true, true,
                        {
                            User_Id: Requested_By,
                            Title: 'Booking Rejected',
                            Detail: 'Your Booking # ' + Request_Id + ' is rejected',
                            Created_By: Accepted_By,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );
                }

                status_cp = true;


            }
        }

    } catch (e) {

        status_cp = false;
        var error_throw = new Error("Invalid Booking");
        error_throw.code = "405";
        throw error_throw;


    }


    if (status_cp) {

        var return_data = helper.Main_Default_Return_Data();

        res.render('main/message/booking_rejected.ejs', return_data);

    } else {

        // status_cp = false;
        // var error_throw = new Error("Invalid Booking");
        // error_throw.code = "404";
        // throw error_throw;

        res.status(200).redirect('/404');

    }
}


exports.index_approved_post = async function (req, res) {



    try {

        var return_data = helper.Main_Default_Return_Data();
        return_data.status = false;
        return_data.message = "";
        return_data.Accepted_By = req.body.company_id;;

        var token = req.params.token;
        var decoded = jwt.verify(token, setting.jwt.secret_booking);

        console.log(decoded);


        return_data.token = token;
        var User_Id = req.body.Booking_Accept_User_Id;

        req.checkBody('Booking_Accept_User_Id', 'Driver Is Required').notEmpty();
        // req.checkBody('company_id', 'Driver Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            return_data.message = "Driver Is Invalid";

        }
        else {


            var Accept_Id = 0;
            var Ride_Id = 0;
            var Request_Id = decoded.ride_id;
            var Accepted_By = 0;
            var db_restult = [];
            await models.Rms_Accept.findAll({
                where: { Request_Id: Request_Id, Is_Active: 1, Accept_Status_Id: 5 },
                attributes: ['Accept_Id', 'Accepted_By'],
                plain: true,

            }).then(data => {

                if (data != null) {

                    if (data.length != 0) {

                        Accept_Id = data.Accept_Id;
                        Accepted_By = data.Accepted_By;


                    }
                }
            });

            // console.log(Accept_Id);
            if (Accept_Id != 0) {

                return_data.status = true;


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
                        Ride_Status_Id: 10,
                        Created_By: Accepted_By,
                        Created_Date: new Date(),
                        Is_Active: 1



                    }
                ).then(data => {

                    Ride_Id = data.Ride_Id;


                }).catch(err => {
                    return_data.error = err;
                });


                if (Ride_Id != 0) {
                    await models.Rms_Accept.update({
                        Accept_Status_Id: 6,
                        Accepted_By: User_Id,
                        Accept_Status_Date: new Date(),
                    }, {
                            where: {
                                Accept_Id: Accept_Id
                            }
                        });


                    await models.Rms_Request.update({
                        Request_Status_Id: 2,
                    }, {
                            where: {
                                Request_Id: Request_Id
                            }
                        });


                }


                if (return_data.status) {



                    var Requested_By = 0;

                    await models.Rms_Request.findAll({
                        where: { Request_Id: Request_Id, Is_Active: 1 },
                        attributes: ['Requested_By'],
                        plain: true,

                    }).then(data => {



                        if (data != null) {

                            if (data.length != 0) {


                                Requested_By = data.Requested_By;


                            }

                        }

                    });

                    //driver


                    notification.send_notification(true, true,
                        {
                            User_Id: User_Id,
                            Title: 'Accepted Booking',
                            Detail: 'You Have Received A Job. Booking # ' + Request_Id,
                            Created_By: Accepted_By,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );

                    //customer

                    notification.send_notification(true, true,
                        {
                            User_Id: Requested_By,
                            Title: 'Accepted Booking',
                            Detail: 'Your Booking is Accepted. Booking # ' + Request_Id,
                            Created_By: Accepted_By,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    );
                }


            } else {

                res.status(200).redirect('/404');
            }

        }

        if (return_data.status == false) {

            return_data.user_record = [];
            return_data.Role_Id = 3;


            await models.User.findAll({
                where: { Is_Active: 1, User_Parent_Id: return_data.Accepted_By },
                attributes: [

                    'User_Id', 'User_Name'

                ], include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },

                ],
                raw: true

            }).then(data => {


                if (data != null) {


                    if (data.length != 0) {

                        return_data.user_record = data;
                    }

                }

            }).catch(err => {
            });
        }else{

            return_data.Role_Id = 4;
            return_data.user_record = [];
        }

        res.render('main/message/booking_approved.ejs', return_data);


    } catch (e) {


        res.status(200).redirect('/404');


    }

}



