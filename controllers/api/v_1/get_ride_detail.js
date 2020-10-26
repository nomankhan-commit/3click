var helper = require('../../../helper/helper');
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


//Get get_ride_detail API V1 (for customer) and driver role)

exports.get_ride_detail = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');


    let Ride_Id = req.body.ride_Id;
    req.checkBody('ride_Id', 'Ride Id is required').notEmpty();

    return_data.error = "Not Found!";
    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // check from DB

        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var Request_Status_Id = 0;
        var Requested_By = 0;

        var Role_id = 0;

        await models.User.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id },
            plain: true,
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    attributes: ['Role_Id']
                },
            ]
        }).then(data => {

            Role_Id = data.Sec_User_Role.Role_Id

        }).catch(err => {
            return_data.error = err;
        });


        if (Role_Id == 2) {

            // get amount from table
            await models.Rms_Request.findOne({
                where: { Is_Active: 1, Requested_By: token_data.user_id, Request_Id: Ride_Id },
                attributes: [
                    "Requested_Expiry"
                    , "Request_Id"
                    , "Request_Status_Id"
                    , "Requested_Date"
                    , "From_Location"
                    , "From_Latitude"
                    , "From_Longitude"
                    , "To_Location"
                    , "To_Latitude"
                    , "To_Longitude"
                    , "Item_Weight"
                    , "Requested_By"
                    , "ETA_Amount"
                ],
                plain: true,
            }).then(data => {

                if (data != null) {
                    return_data.status = true;
                    return_data.message = "Susscess";
                    return_data.error = null;

                    Request_Status_Id = data.Request_Status_Id;

                    return_data.response.ride_id = data.Request_Id;

                    return_data.response.starting = data.Requested_Date;
                    return_data.response.amount = data.ETA_Amount;


                    if (data.Request_Status_Id == 2) {
                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "0.0";

                    } else if (data.Request_Status_Id == 1) {

                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "";

                    } else {

                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "0.0";
                    }

                    // return_data.response.data = data;     

                    return_data.response.rider_name = "";
                    return_data.response.rider_number = "";
                    return_data.response.rider_image = "";
                    return_data.response.customer_name = "";
                    return_data.response.customer_number = "";
                    return_data.response.customer_image = "";

                    return_data.response.location_image = "";
                    return_data.response.expire_date_time = data.Requested_Expiry;
                    return_data.response.pickup_location_name = data.From_Location;
                    return_data.response.pickup_latitude = data.From_Latitude;
                    return_data.response.pickup_longitude = data.From_Longitude;
                    return_data.response.drop_off_location_name = data.To_Location;
                    return_data.response.drop_off_latitude = data.To_Latitude;
                    return_data.response.drop_off_longitude = data.To_Longitude;
                    return_data.response.ton = data.Item_Weight;
                    Requested_By = data.Requested_By;

                    return_data.response.ride_status = "Pending";
                    return_data.response.ride_status_id = "Pending";


                } else {


                    return_data.error = "Record Not Found!";
                }


            }).catch(err => {
                return_data.error = "Not Found";;
            });


            if (Requested_By != 0) {



                await models.User.findOne({
                    where: { User_Id: Requested_By },
                    plain: true,
                    attributes: ['User_Id'],
                    include: [
                        {
                            model: models.User_Contact, as: "User_Contact"
                            , attributes: ['User_Contact_Value1']
                            , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Document, as: "User_Document"
                            , attributes: ['Document_Detail']
                            , where: { Document_Type: "profile_image", Is_Active: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Profile, as: "User_Profile"
                            , attributes: ['First_Name', 'Last_Name']
                        }

                    ]
                }).then(data => {


                    return_data.response.customer_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;

                    // if (data.User_Contact.User_Contact_Value1 != null) {
                    if (data.User_Contact.length != 0) {

                        // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                        return_data.response.customer_number = data.User_Contact[0].User_Contact_Value1;
                    } else {
                        return_data.response.customer_number = "";
                    }

                    if (data.User_Document.length != 0) {
                        return_data.response.customer_image = data.User_Document[0].Document_Detail;
                    } else {
                        return_data.response.customer_image = "";
                    }

                    // if (data.User_Document.Document_Detail != null) {

                    //     return_data.response.customer_image = data.User_Document.Document_Detail;;
                    // } else {
                    //     return_data.response.customer_image = "";
                    // }


                });



            } else {
                // return_data.response.customer_name = "";
                // return_data.response.customer_image = "";
                // return_data.response.customer_number = "";

            }

            if (return_data.error == null) {


                var Accepted_By = 0;
                var Accept_Id = 0;

                await models.Rms_Accept.findOne({
                    where: { Is_Active: 1, Request_Id: Ride_Id },
                    attributes: [
                        "Accepted_By", "Accept_Id", 'Accept_Status_Id'
                    ],
                    include: [
                        {
                            model: models.Sys_List, as: "Accept_Status"
                            , attributes: ['List_Value']
                            , where: { Is_Active: 1, List_Type_Id: 6 }
                            , required: false
                        }
                    ],
                    plain: true,
                }).then(data => {

                    return_data.response.ride_status = data.Accept_Status.List_Value;
                    return_data.response.ride_status_id = data.Accept_Status_Id;
                    Accepted_By = data.Accepted_By
                    Accept_Id = data.Accept_Id
                });

                var User_Parent_Id = 0;


                if (Request_Status_Id == 1 || Request_Status_Id == 2 || Request_Status_Id == 3) {

                    await models.Rms_Ride.findOne({

                        where: { Is_Active: 1, Accept_Id: Accept_Id },
                        attributes: [
                            "Start_Time", "Surge_Charge", "Total_Fare"
                        ],
                        plain: true,

                    }).then(data => {

                        if (data != null) {
                            return_data.response.moving = data.Start_Time;
                            return_data.response.waiting = return_data.response.moving - return_data.response.starting;
                            return_data.response.Surge_Charge = data.Surge_Charge + "";
                            return_data.response.amount = data.Total_Fare + "";

                        } else {

                            return_data.response.moving = "";
                            return_data.response.waiting = "";
                            // return_data.response.amount = "";
                            return_data.response.Surge_Charge = "";
                        }


                        // return_data.response.moving = data.Start_Time+"";                  
                        // return_data.response.service_fee = data.Surge_Charge+"";
                        // return_data.response.amount = data.Total_Fare+"";

                    });



                }
                await models.User.findOne({
                    where: { User_Id: Accepted_By },
                    plain: true,
                    attributes: ['User_Id', 'User_Parent_Id'],
                    include: [
                        {
                            model: models.User_Profile, as: "User_Profile"
                            , attributes: ['First_Name', 'Last_Name']
                        }, {
                            model: models.User_Contact, as: "User_Contact"
                            , attributes: ['User_Contact_Value1']
                            , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Document, as: "User_Document"
                            , attributes: ['Document_Detail']
                            , where: { Document_Type: "profile_image", Is_Active: 1 }
                            , required: false
                        },
                        {
                            model: models.Sec_User_Role, as: "Sec_User_Role"
                            , attributes: ['Role_Id']
                            , where: { Is_Active: 1 }
                            , required: true
                        }, {
                            model: models.User_Custom_Info, as: "User_Vehicle_Register"
                            , attributes: ['Field_Value']
                            , where: { Is_Active: 1 , Field_Id: 3 }
                            , required: false
                        },
                    ]
                }).then(data => {

                    return_data.response.rider_name = data.User_Profile.First_Name;
                    return_data.response.rider_id = data.User_Id + "";

                    if (data.User_Contact.length != 0) {

                        // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                        return_data.response.rider_number = data.User_Contact[0].User_Contact_Value1;
                    } else {
                        return_data.response.rider_number = "";
                    }

                    if (data.User_Document.length != 0) {
                        return_data.response.rider_image = data.User_Document[0].Document_Detail;
                    } else {
                        return_data.response.rider_image = "";
                    }

                    if (data.User_Vehicle_Register  != null) {
                        return_data.response.vehicle_number = data.User_Vehicle_Register.Field_Value;
                    } else {
                        return_data.response.vehicle_number = "";
                    }

                    User_Parent_Id = data.User_Parent_Id;
                    if (User_Parent_Id == 0) {
                        return_data.response.fleet_name = data.User_Profile.First_Name

                        if (data.User_Contact.length != 0) {

                            return_data.response.fleet_number = data.User_Contact[0].User_Contact_Value1;
                        } else {
                            return_data.response.fleet_number = "";
                        }

                        if (data.User_Document.length != 0) {
                            return_data.response.fleet_image = data.User_Document[0].Document_Detail;
                        } else {
                            return_data.response.fleet_image = "";
                        }


                        return_data.response.fleet_type = 0;
                        if (data.Sec_User_Role.Role_Id == 3) {

                            return_data.response.fleet_type = 1;
                        }

                    }
                });

                if (User_Parent_Id != 0) {

                    await models.User.findOne({
                        where: { User_Id: User_Parent_Id },
                        plain: true,
                        attributes: ['User_Id', 'User_Parent_Id'],
                        include: [
                            {
                                model: models.User_Contact, as: "User_Contact"
                                , attributes: ['User_Contact_Value1']
                                , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                                , required: false
                            },
                            {
                                model: models.User_Document, as: "User_Document"
                                , attributes: ['Document_Detail']
                                , where: { Document_Type: "profile_image", Is_Active: 1 }
                                , required: false
                            },
                            {
                                model: models.User_Profile, as: "User_Profile"
                                , attributes: ['First_Name', 'Last_Name']
                            }

                        ]
                    }).then(data => {

                        return_data.response.fleet_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;

                        // if (data.User_Contact.User_Contact_Value1 != null) {
                        if (data.User_Contact.length != 0) {

                            // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                            return_data.response.fleet_number = data.User_Contact[0].User_Contact_Value1;
                        } else {
                            return_data.response.fleet_number = "";
                        }

                        if (data.User_Document.length != 0) {
                            return_data.response.fleet_image = data.User_Document[0].Document_Detail;
                        } else {
                            return_data.response.fleet_image = "";
                        }

                        return_data.response.fleet_type = 1;


                    });
                }


            }


        } else if (Role_Id == 4) {

            // get amount from table
            await models.Rms_Request.findOne({
                where: { Is_Active: 1, Request_Id: Ride_Id },
                attributes: [
                    "Requested_Expiry"
                    , "Request_Id"
                    , "Request_Status_Id"
                    , "Requested_Date"
                    , "From_Location"
                    , "From_Latitude"
                    , "From_Longitude"
                    , "To_Location"
                    , "To_Latitude"
                    , "To_Longitude"
                    , "Item_Weight"
                    , "Requested_By"
                    , "ETA_Amount"


                ],
                include: [
                    {
                        model: models.Rms_Accept, as: "Rms_Accept"
                        , attributes: []
                        , where: { Is_Active: 1, Accepted_By: token_data.user_id }
                        , required: true
                    },

                ],
                plain: true,
            }).then(data => {

                if (data != null) {
                    return_data.status = true;
                    return_data.message = "Susscess";
                    return_data.error = null;

                    Request_Status_Id = data.Request_Status_Id;

                    return_data.response.ride_id = data.Request_Id;

                    return_data.response.amount = data.ETA_Amount;

                    return_data.response.starting = data.Requested_Date;

                    if (data.Request_Status_Id == 2) {
                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "0.0";

                    } else if (data.Request_Status_Id == 1) {

                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "";

                    } else {

                        // return_data.response.amount = "0.0";
                        return_data.response.moving = "";
                        return_data.response.waiting = "";
                        return_data.response.service_fee = "0.0";
                    }

                    // return_data.response.data = data;     

                    return_data.response.rider_name = "";
                    return_data.response.rider_number = "";
                    return_data.response.rider_image = "";
                    return_data.response.customer_name = "";
                    return_data.response.customer_number = "";
                    return_data.response.customer_image = "";

                    return_data.response.location_image = "";
                    return_data.response.expire_date_time = data.Requested_Expiry;
                    return_data.response.pickup_location_name = data.From_Location;
                    return_data.response.pickup_latitude = data.From_Latitude;
                    return_data.response.pickup_longitude = data.From_Longitude;
                    return_data.response.drop_off_location_name = data.To_Location;
                    return_data.response.drop_off_latitude = data.To_Latitude;
                    return_data.response.drop_off_longitude = data.To_Longitude;
                    return_data.response.ton = data.Item_Weight;
                    Requested_By = data.Requested_By;

                    return_data.response.ride_status = "Pending";
                    return_data.response.ride_status_id = "Pending";


                } else {


                    return_data.error = "Record Not Found!";
                }


            }).catch(err => {
                return_data.error = "Not Found";;
            });


            if (Requested_By != 0) {



                await models.User.findOne({
                    where: { User_Id: Requested_By },
                    plain: true,
                    attributes: ['User_Id'],
                    include: [
                        {
                            model: models.User_Contact, as: "User_Contact"
                            , attributes: ['User_Contact_Value1']
                            , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Document, as: "User_Document"
                            , attributes: ['Document_Detail']
                            , where: { Document_Type: "profile_image", Is_Active: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Profile, as: "User_Profile"
                            , attributes: ['First_Name', 'Last_Name']
                        }

                    ]
                }).then(data => {


                    return_data.response.customer_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;

                    // if (data.User_Contact.User_Contact_Value1 != null) {
                    if (data.User_Contact.length != 0) {

                        // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                        return_data.response.customer_number = data.User_Contact[0].User_Contact_Value1;
                    } else {
                        return_data.response.customer_number = "";
                    }

                    if (data.User_Document.length != 0) {
                        return_data.response.customer_image = data.User_Document[0].Document_Detail;
                    } else {
                        return_data.response.customer_image = "";
                    }

                    // if (data.User_Document.Document_Detail != null) {

                    //     return_data.response.customer_image = data.User_Document.Document_Detail;;
                    // } else {
                    //     return_data.response.customer_image = "";
                    // }


                });



            } else {
                // return_data.response.customer_name = "";
                // return_data.response.customer_image = "";
                // return_data.response.customer_number = "";

            }

            if (return_data.error == null) {


                var Accepted_By = 0;
                var Accept_Id = 0;

                await models.Rms_Accept.findOne({
                    where: { Is_Active: 1, Request_Id: Ride_Id },
                    attributes: [
                        "Accepted_By", "Accept_Id", 'Accept_Status_Id'
                    ],
                    include: [
                        {
                            model: models.Sys_List, as: "Accept_Status"
                            , attributes: ['List_Value']
                            , where: { Is_Active: 1, List_Type_Id: 6 }
                            , required: false
                        }
                    ],
                    plain: true,
                }).then(data => {

                    return_data.response.ride_status = data.Accept_Status.List_Value;
                    return_data.response.ride_status_id = data.Accept_Status_Id;
                    Accepted_By = data.Accepted_By
                    Accept_Id = data.Accept_Id
                });

                var User_Parent_Id = 0;


                if (Request_Status_Id == 1) {

                    await models.Rms_Ride.findOne({

                        where: { Is_Active: 1, Accept_Id: Accept_Id },
                        attributes: [
                            "Start_Time", "Surge_Charge", "Total_Fare"
                        ],
                        plain: true,

                    }).then(data => {

                        if (data != null) {
                            return_data.response.moving = data.Start_Time;
                            return_data.response.waiting = return_data.response.moving - return_data.response.starting;
                            return_data.response.Surge_Charge = data.Surge_Charge + "";
                            return_data.response.amount = data.Total_Fare + "";

                        } else {

                            return_data.response.moving = "";
                            return_data.response.waiting = "";
                            // return_data.response.amount = "";
                            return_data.response.Surge_Charge = "";
                        }


                        // return_data.response.moving = data.Start_Time+"";                  
                        // return_data.response.service_fee = data.Surge_Charge+"";
                        // return_data.response.amount = data.Total_Fare+"";

                    });



                }
                await models.User.findOne({
                    where: { User_Id: Accepted_By },
                    plain: true,
                    attributes: ['User_Id', 'User_Parent_Id'],
                    include: [
                        {
                            model: models.User_Profile, as: "User_Profile"
                            , attributes: ['First_Name', 'Last_Name']
                        }, {
                            model: models.User_Contact, as: "User_Contact"
                            , attributes: ['User_Contact_Value1']
                            , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Document, as: "User_Document"
                            , attributes: ['Document_Detail']
                            , where: { Document_Type: "profile_image", Is_Active: 1 }
                            , required: false
                        },{
                            model: models.User_Custom_Info, as: "User_Vehicle_Register"
                            , attributes: ['Field_Value']
                            , where: { Is_Active: 1 , Field_Id: 3 }
                            , required: false
                        },
                    ]
                }).then(data => {

                    return_data.response.rider_name = data.User_Profile.First_Name;
                    return_data.response.rider_id = data.User_Id + "";

                    if (data.User_Contact.length != 0) {

                        // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                        return_data.response.rider_number = data.User_Contact[0].User_Contact_Value1;
                    } else {
                        return_data.response.rider_number = "";
                    }

                    if (data.User_Document.length != 0) {
                        return_data.response.rider_image = data.User_Document[0].Document_Detail;
                    } else {
                        return_data.response.rider_image = "";
                    }

                    if (data.User_Vehicle_Register  != null) {
                        return_data.response.vehicle_number = data.User_Vehicle_Register.Field_Value;
                    } else {
                        return_data.response.vehicle_number = "";
                    }

                    User_Parent_Id = data.User_Parent_Id;

                    if (User_Parent_Id == 0) {
                        return_data.response.fleet_name = data.User_Profile.First_Name

                        if (data.User_Contact.length != 0) {

                            return_data.response.fleet_number = data.User_Contact[0].User_Contact_Value1;
                        } else {
                            return_data.response.fleet_number = "";
                        }

                        if (data.User_Document.length != 0) {
                            return_data.response.fleet_image = data.User_Document[0].Document_Detail;
                        } else {
                            return_data.response.fleet_image = "";
                        }

                    }


                });

                if (User_Parent_Id != 0) {

                    await models.User.findOne({
                        where: { User_Id: User_Parent_Id },
                        plain: true,
                        attributes: ['User_Id', 'User_Parent_Id'],
                        include: [
                            {
                                model: models.User_Contact, as: "User_Contact"
                                , attributes: ['User_Contact_Value1']
                                , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                                , required: false
                            },
                            {
                                model: models.User_Document, as: "User_Document"
                                , attributes: ['Document_Detail']
                                , where: { Document_Type: "profile_image", Is_Active: 1 }
                                , required: false
                            },
                            {
                                model: models.User_Profile, as: "User_Profile"
                                , attributes: ['First_Name', 'Last_Name']
                            }

                        ]
                    }).then(data => {

                        return_data.response.fleet_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;

                        // if (data.User_Contact.User_Contact_Value1 != null) {
                        if (data.User_Contact.length != 0) {

                            // return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                            return_data.response.fleet_number = data.User_Contact[0].User_Contact_Value1;
                        } else {
                            return_data.response.fleet_number = "";
                        }

                        if (data.User_Document.length != 0) {
                            return_data.response.fleet_image = data.User_Document[0].Document_Detail;
                        } else {
                            return_data.response.fleet_image = "";
                        }
                        return_data.response.fleet_type = 1;


                    });
                } else {

                    // return_data.response.fleet_name = "";
                    // return_data.response.fleet_number = "";
                    // return_data.response.fleet_image = "";
                    return_data.response.fleet_type = 0;
                }



            }





        } else {

            return_data.error = "Not Found";;
        }

    }


    res.send(JSON.stringify(return_data));

}