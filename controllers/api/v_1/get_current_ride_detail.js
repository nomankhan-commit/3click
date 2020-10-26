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

//Get get_earnings API V1 (for driver role)

exports.get_current_ride_detail = async function (req, res) {

    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');


    var Ride_Id = req.body.ride_id;
    req.checkBody('ride_id', 'Ride Id is required').notEmpty();

    console.log(Ride_Id);

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


        // get amount from table
        await models.Rms_Request.findOne({
            where: { Is_Active: 1, Request_Id: Ride_Id },
            attributes: [
                "Requested_Expiry"
                , "Request_Id"
                , "Request_Status_Id"
                , "Requested_Date"
                , 'Requested_By'
                , 'ETA_Amount'
            ],
            include: [
                {
                    model: models.Rms_Accept, as: "Rms_Accept"
                    , attributes: []
                    , where: { Is_Active: 1, Accepted_By: token_data.user_id, Accept_Status_Id: [7, 5, 6] }
                    //, required: false
                }
            ],
            plain: true,
        }).then(data => {

            if (data != null) {
                return_data.status = true;
                return_data.message = "Susscess";
                return_data.error = null;

                Request_Status_Id = data.Request_Status_Id;
                Requested_By = data.Requested_By;

                return_data.response.eta_amount = data.ETA_Amount;

                // return_data.response.data = data;     

                return_data.response.customer_name = null;
                return_data.response.customer_number = null;
                return_data.response.customer_image = null;

                return_data.response.location_image = null;
                return_data.response.expire_date_time = data.Requested_Expiry;

            } else {

                return_data.error = "Not Found!";
            }


        }).catch(err => {
            return_data.error = err;
        });


        if (return_data.error == null) {



            var Accepted_By = 0;
            var Accept_Id = 0;

            await models.Rms_Accept.findOne({
                where: { Is_Active: 1, Request_Id: Ride_Id },
                attributes: [
                    "Accepted_By", "Accept_Id"
                ],
                plain: true,
            }).then(data => {

                Accepted_By = data.Accepted_By
                Accept_Id = data.Accept_Id
            });

            var User_Parent_Id = 0;


            await models.User.findOne({
                where: { User_Id: Requested_By },
                plain: true,
                attributes: ['User_Id', 'User_Parent_Id'],
                include: [
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: ['First_Name', 'Last_Name']
                    }
                ]
            }).then(data => {

                return_data.response.customer_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;
                User_Parent_Id = data.User_Parent_Id;
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

                    return_data.response.customer_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;
                    if (data.User_Contact.User_Contact_Value1 != null) {

                        return_data.response.customer_number = data.User_Contact.User_Contact_Value1;
                    } else {
                        return_data.response.customer_number = "";
                    }

                    if (data.User_Document.Document_Detail != null) {

                        return_data.response.customer_image = data.User_Document.Document_Detail;;
                    } else {
                        return_data.response.customer_image = "";
                    }


                });
            }



        }


    }


    res.send(JSON.stringify(return_data));
}