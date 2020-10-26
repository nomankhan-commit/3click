var helper = require('../../helper/helper');
var notification = require('../../helper/notification');
var models = require('../../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


exports.list_current = async function (req, res) {

    var return_data = helper.Cms_Default_Return_Data();
    return_data.AS_Booking_Expiry = helper.Application_Setting_Booking_Expiry();

    return_data.session_user_data = req.session.user_data;




    return_data.data_record = [];
    return_data.user_record = [];


    await models.User.findAll({
        where: { Is_Active: 1, User_Parent_Id: return_data.session_user_data.User_Id },
        attributes: [

            'User_Id','User_Name'

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


    await models.Rms_Request.findAll({
        where: { Is_Active: 1 },
        attributes: [

            [Sequelize.fn("concat", ""), "waiting"]
            , "Requested_Date"
            , "Requested_Expiry"
            , "From_Location"
            , "To_Location"
            , "Item_Weight"
            , "Created_Date"
            ,"ETA_Amount"
            , [Sequelize.col('Rms_Request.Request_Id'), "Request_Id"]

        ],
        include: [
            {
                model: models.Rms_Accept, as: "Rms_Accept"
                , attributes: []
                , where: { Is_Active: 1, Accepted_By: return_data.session_user_data.User_Id, Accept_Status_Id: 5 }
                , include: [
                    {
                        model: models.Sys_List, as: "Accept_Status"
                        , attributes: ['List_Value']
                        , where: { Is_Active: 1, List_Type_Id: 6 }
                        , required: false
                    }
                ]

                // , required: false
            },
            {
                model: models.User, as: "User"
                , attributes: []
                , where: { Is_Active: 1, }
                , include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },
                    {
                        model: models.User_Document, as: "profile_image"
                        , attributes: ['Document_Detail']
                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                        , required: false
                    }
                ]

                , required: false
            },
            {
                model: models.Sys_List, as: "Weight_List"
                , attributes: ['List_Name']
                , where: { Is_Active: 1, List_Type_Id: 8 }
                , required: false
            },


        ],
        raw: true,
        // limit: 50,
        order: [
            ['Request_Id', 'DESC'],
        ],
    }).then(data => {


        if (data != null) {


            if (data.length != 0) {

                return_data.data_record = data;

            } else {


            }

        } else {


        }


    }).catch(err => {
    });

    //  res.send(return_data);

    res.render('cms/module/booking/current_list', return_data);
}

exports.list_schedule = async function (req, res) {

    var return_data = helper.Cms_Default_Return_Data();

    return_data.session_user_data = req.session.user_data;


    return_data.data_record = [];


    var User_Parent_Id = [];

    await models.User.findAll({
        where: { Is_Active: 1, User_Parent_Id: return_data.session_user_data.User_Id },
        attributes: [

            [Sequelize.fn('GROUP_CONCAT', Sequelize.col('User_Id')), 'User_Id']

        ],


    }).then(data => {


        if (data != null) {


            if (data.length != 0) {

                User_Parent_Id = data[0].User_Id;
            }

        }

    }).catch(err => {
    });

    // return_data.User_Parent_Id  =  User_Parent_Id;
    await models.Rms_Request.findAll({
        where: { Is_Active: 1 },
        attributes: [

            [Sequelize.fn("concat", ""), "waiting"]
            , "Requested_Date"
            , "Requested_Expiry"
            , "From_Location"
            , "To_Location"
            , "Item_Weight"
            , "Created_Date"
            ,"ETA_Amount"
            , [Sequelize.col('Rms_Request.Request_Id'), "Request_Id"]

        ],
        include: [
            {
                model: models.Rms_Accept, as: "Rms_Accept"
                , attributes: []
                , where: { Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [6, 7] }
                , include: [
                    {
                        model: models.Sys_List, as: "Accept_Status"
                        , attributes: ['List_Value']
                        , where: { Is_Active: 1, List_Type_Id: 6 }
                        , required: false
                    }
                ]

                // , required: false
            },
            {
                model: models.User, as: "User"
                , attributes: []
                , where: { Is_Active: 1, }
                , include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },
                    {
                        model: models.User_Document, as: "profile_image"
                        , attributes: ['Document_Detail']
                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                        , required: false
                    }
                ]

                , required: false
            },
            {
                model: models.Sys_List, as: "Weight_List"
                , attributes: ['List_Name']
                , where: { Is_Active: 1, List_Type_Id: 8 }
                , required: false
            },


        ],
        raw: true,
        // limit: 50,
        order: [
            ['Request_Id', 'DESC'],
        ],
    }).then(data => {

        console.log(data);

        if (data != null) {


            if (data.length != 0) {

                return_data.data_record = data;

            } else {


            }

        } else {


        }


    }).catch(err => {
    });

    // res.send(return_data);

    res.render('cms/module/booking/schedule_list', return_data);
}

exports.list_cancelled = async function (req, res) {

    var return_data = helper.Cms_Default_Return_Data();

    return_data.session_user_data = req.session.user_data;


    return_data.data_record = [];

    await models.Rms_Request.findAll({
        where: { Is_Active: 1 },
        attributes: [

            [Sequelize.fn("concat", ""), "waiting"]
            , "Requested_Date"
            , "Requested_Expiry"
            , "From_Location"
            , "To_Location"
            , "Item_Weight"
            , "Created_Date"
            , "ETA_Amount"
            , [Sequelize.col('Rms_Request.Request_Id'), "Request_Id"]

        ],
        include: [
            {
                model: models.Rms_Accept, as: "Rms_Accept"
                , attributes: []
                , where: { Is_Active: 1, Accepted_By: return_data.session_user_data.User_Id, Accept_Status_Id: 9, Reference_Accept_Id: -1 }
                , include: [
                    {
                        model: models.Sys_List, as: "Accept_Status"
                        , attributes: ['List_Value']
                        , where: { Is_Active: 1, List_Type_Id: 6 }
                        , required: false
                    }
                ]

                // , required: false
            },
            {
                model: models.User, as: "User"
                , attributes: []
                , where: { Is_Active: 1, }
                , include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },
                    {
                        model: models.User_Document, as: "profile_image"
                        , attributes: ['Document_Detail']
                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                        , required: false
                    }
                ]

                , required: false
            },
            {
                model: models.Sys_List, as: "Weight_List"
                , attributes: ['List_Name']
                , where: { Is_Active: 1, List_Type_Id: 8 }
                , required: false
            },


        ],
        raw: true,
        // limit: 50,
        order: [
            ['Request_Id', 'DESC'],
        ],
    }).then(data => {

        console.log(data);

        if (data != null) {


            if (data.length != 0) {

                return_data.data_record = data;

            } else {


            }

        } else {


        }


    }).catch(err => {
    });

    // res.send(return_data.data_record);

    res.render('cms/module/booking/cancelled_list', return_data);
}


exports.list_rejected = async function (req, res) {

    var return_data = helper.Cms_Default_Return_Data();

    return_data.session_user_data = req.session.user_data;


    return_data.data_record = [];

    await models.Rms_Request.findAll({
        where: { Is_Active: 1 },
        attributes: [

            [Sequelize.fn("concat", ""), "waiting"]
            , "Requested_Date"
            , "Requested_Expiry"
            , "From_Location"
            , "To_Location"
            , "Item_Weight"
            , "Created_Date"
            , "ETA_Amount"
            , [Sequelize.col('Rms_Request.Request_Id'), "Request_Id"]

        ],
        include: [
            {
                model: models.Rms_Accept, as: "Rms_Accept"
                , attributes: ['Accept_Status_Id']
                , where: { Is_Active: 1, Accepted_By: return_data.session_user_data.User_Id, Accept_Status_Id: 9 , Reference_Accept_Id: 0 }
                , include: [
                    {
                        model: models.Sys_List, as: "Accept_Status"
                        , attributes: ['List_Value']
                        , where: { Is_Active: 1, List_Type_Id: 6 }
                        , required: false
                    }
                ]

                // , required: false
            },
            {
                model: models.User, as: "User"
                , attributes: []
                , where: { Is_Active: 1, }
                , include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name']
                        , where: { Is_Active: 1 }
                        , required: false
                    },
                    {
                        model: models.User_Document, as: "profile_image"
                        , attributes: ['Document_Detail']
                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                        , required: false
                    }
                ]

                , required: false
            },
            {
                model: models.Sys_List, as: "Weight_List"
                , attributes: ['List_Name']
                , where: { Is_Active: 1, List_Type_Id: 8 }
                , required: false
            },


        ],
        raw: true,
        // limit: 50,
        order: [
            ['Request_Id', 'DESC'],
        ],
    }).then(data => {

        console.log(data);

        if (data != null) {


            if (data.length != 0) {

                return_data.data_record = data;

            } else {


            }

        } else {


        }


    }).catch(err => {
    });

    // res.send(return_data.data_record);

    res.render('cms/module/booking/rejected_list', return_data);
}


exports.post_accept = async function (req, res) {
    return_data = { status: false, message: "", response: {} };

    session_user_data = req.session.user_data;

    res.header('Content-Type', 'application/json');

    var Request_Id = req.body.Booking_Accept_Request_Id;
    var User_Id = req.body.Booking_Accept_User_Id;

    req.checkBody('Booking_Accept_Request_Id', 'Ride Id Is Required').notEmpty();
    req.checkBody('Booking_Accept_User_Id', 'Driver Is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.message = "Invalid Ride Id";
        //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

    }
    else {

        var Accept_Id = 0;
        var db_restult = [];
        await models.Rms_Accept.findAll({
            where: { Request_Id: Request_Id, Is_Active: 1, Accepted_By: session_user_data.User_Id, Accept_Status_Id: 5 },
            attributes: ['Accept_Id'],
            plain: true,

        }).then(data => {



            if (data != null) {

                if (data.length != 0) {


                    Accept_Id = data.Accept_Id;


                } else {

                    return_data.message = "Invalid Ride Id";
                }
            } else {

                return_data.message = "Invalid Ride Id";
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
    
                return_data.status = true;
                return_data.message = "Ride Approved Successfully";
            } else {
    
                return_data.error = "Invalid Ride Id";
            }
    

                if(return_data.status){

                    

                    var Requested_By = 0;

                    await models.Rms_Request.findAll({
                        where: { Request_Id: Request_Id, Is_Active: 1},
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

                   
                    notification.send_notification(true,true,
                        {   User_Id:User_Id,
                            Title:'Accepted Booking',
                            Detail:'You Have Received A Job. Booking # '+Request_Id,
                            Created_By : session_user_data.User_Id,
                            Created_Date : new Date(),
                            Is_Active : 1
                        }
                    );

                    //customer

                    notification.send_notification(true,true,
                        {   User_Id:Requested_By,
                            Title:'Accepted Booking',
                            Detail:'Your Booking is Accepted. Booking # '+Request_Id,
                            Created_By : session_user_data.User_Id,
                            Created_Date : new Date(),
                            Is_Active : 1
                        }
                    );
                }

    
    
    
        } else {
    
            return_data.message = "Invalid Ride Id";
    
        }
    
    
       
    }
    res.send(JSON.stringify(return_data));
    


}

exports.post_reject = async function (req, res) {
    return_data = { status: false, message: "", response: {} };

    session_user_data = req.session.user_data;

    res.header('Content-Type', 'application/json');

    var Request_Id = req.body.Booking_Reject_Request_Id;

    req.checkBody('Booking_Reject_Request_Id', 'Ride Id Is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.message = "Invalid Ride Id";
        //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

    }
    else {

        var Accept_Id = 0;
        var db_restult = [];
        await models.Rms_Accept.findAll({
            where: { Request_Id: Request_Id, Is_Active: 1, Accepted_By: session_user_data.User_Id, Accept_Status_Id: 5 },
            attributes: ['Accept_Id'],
            plain: true,

        }).then(data => {



            if (data != null) {

                if (data.length != 0) {


                    Accept_Id = data.Accept_Id;



                } else {

                    return_data.message = "Invalid Ride Id";
                }
            } else {

                return_data.message = "Invalid Ride Id";
            }

        });



    }


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
            return_data.error = err;
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
                                where: { Request_Id: Request_Id},
                                attributes: ['Requested_By'],
                                plain: true,
                    
                            }).then(data => {
                    
                    
                    
                                if (data != null) {
                    
                                    if (data.length != 0) {
                    
                    
                                        Requested_By = data.Requested_By;
                    
                    
                    
                                    } 
                                } 
                    
                            });

                            if(Requested_By != 0){
                                notification.send_notification(true,true,
                                    {   User_Id:Requested_By,
                                        Title:'Booking Rejected',
                                        Detail:'Your Booking # '+Request_Id+' is rejected',
                                        Created_By : session_user_data.User_Id,
                                        Created_Date : new Date(),
                                        Is_Active : 1
                                    }
                                );
                            }

            return_data.status = true;
            return_data.message = "Ride Reject Successfully";

        } else {

            return_data.message = "Invalid Ride Id";

        }




    } else {

        return_data.message = "Invalid Ride Id";

    }


    res.send(JSON.stringify(return_data));

}

exports.post_view = async function (req, res) {
    return_data = { status: false, message: "", response: {} };

    session_user_data = req.session.user_data;

    res.header('Content-Type', 'application/json');

    var Request_Id = req.body.Booking_View_Request_Id;

    req.checkBody('Booking_View_Request_Id', 'Ride Id Is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.message = "Invalid Ride Id";
        //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

    }
    else {

        var Accept_Id = 0;
        var db_restult = [];
        await models.Rms_Accept.findAll({
            where: { Request_Id: Request_Id, Is_Active: 1, Accepted_By: session_user_data.User_Id,
                //  Accept_Status_Id: 5 
                },
            attributes: ['Accept_Id'],
            raw: true,

        }).then(data => {



            if (data != null) {

                if (data.length != 0) {


                    Accept_Id = data.Accept_Id;


                } else {

                    return_data.message = "Invalid Ride Id";
                }
            } else {

                return_data.message = "Invalid Ride Id";
            }

        });



    }


    if (Accept_Id != 0) {


        await models.Rms_Request.findOne({
            where: { Is_Active: 1 , Request_Id: Request_Id },
            attributes: [
    
                [Sequelize.fn("concat", ""), "waiting"]
                , "Requested_Date"
                , "Requested_Expiry"
                , "From_Location"
                , "To_Location"
                , "Item_Weight"
                , "Created_Date"
                ,"ETA_Amount"
                , [Sequelize.col('Rms_Request.Request_Id'), "Request_Id"]
    
            ],
            include: [
               
                {
                    model: models.User, as: "User"
                    , attributes: []
                    , where: { Is_Active: 1, }
                    , include: [
                        {
                            model: models.User_Profile, as: "User_Profile"
                            , attributes: ['First_Name']
                            , where: { Is_Active: 1 }
                            , required: false
                        },
                        {
                            model: models.User_Document, as: "profile_image"
                            , attributes: ['Document_Detail']
                            , where: { Is_Active: 1, Document_Type: "profile_image" }
                            , required: false
                        },
                    ]
    
                    , required: false
                },
                {
                    model: models.Sys_List, as: "Weight_List"
                    , attributes: ['List_Name']
                    , where: { Is_Active: 1, List_Type_Id: 8  }
                    , required: false
                },
    
    
            ],
            raw: true,
        }).then(data => {
    
    
            if (data != null) {

                var moment = require('moment');

                return_data.status = true;
                var booking_data = moment(data.Created_Date);                 
                data.Created_Date = booking_data.format('DD/MM/YYYY');
                return_data.data_record = data;
    
            } else {
                return_data.message = "No record found";
    
            }
    
    
        }).catch(err => {

           
        });

      

    } else {

        return_data.message = "Invalid Ride Id";

    }


    res.send(JSON.stringify(return_data));

}